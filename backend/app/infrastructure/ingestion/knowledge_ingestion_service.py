from datetime import datetime
from hashlib import sha256
from uuid import uuid4

import httpx
from app.core.config import settings
from app.infrastructure.ai.gemini_embedding import get_embedding_model
from app.infrastructure.ingestion.html_extractor import extract_document
from app.infrastructure.models.knowledge_document_model import KnowledgeDocumentEmbeddingModel, KnowledgeDocumentModel
from app.infrastructure.models.trusted_source_model import TrustedSourceModel
from sqlalchemy.orm import Session


class KnowledgeIngestionService:
    """Fetches only approved sources and upserts deduplicated knowledge."""

    def __init__(self, session: Session):
        self.session = session

    def ingest_source(self, source: TrustedSourceModel) -> dict[str, str]:
        if not source.is_active:
            return {"status": "skipped_inactive"}
        response = httpx.get(source.base_url, follow_redirects=True, timeout=20.0)
        response.raise_for_status()
        title, content = extract_document(response.text)
        content = " ".join(content.split())
        if len(content) < 100:
            raise ValueError("La fuente no produjo contenido textual suficiente")

        canonical_url = str(response.url)
        content_hash = sha256(content.encode("utf-8")).hexdigest()
        existing = self.session.query(KnowledgeDocumentModel).filter(
            (KnowledgeDocumentModel.canonical_url == canonical_url)
            | (KnowledgeDocumentModel.content_hash == content_hash)
        ).first()
        source.last_crawled_at = datetime.utcnow()
        if existing:
            self.session.commit()
            return {"status": "duplicate", "document_id": str(existing.id)}

        document = KnowledgeDocumentModel(
            id=uuid4(), source_id=source.id, title=title or source.name,
            content=content, canonical_url=canonical_url, content_hash=content_hash,
            # The source has already been approved by an administrator. The
            # document is usable as retrieval context but remains ineligible
            # for supervised training until it receives a fact label.
            validation_status="ingested",
        )
        self.session.add(document)
        self.session.flush()
        embedding_status = "skipped_missing_google_api_key"
        if settings.GOOGLE_API_KEY:
            vector = get_embedding_model().generate(f"{document.title}\n\n{document.content}")
            self.session.add(KnowledgeDocumentEmbeddingModel(
                id=uuid4(), document_id=document.id, provider="google",
                model="models/gemini-embedding-001", dimensions=len(vector), vector=vector,
            ))
            embedding_status = "created"
        self.session.commit()
        return {"status": "created", "document_id": str(document.id), "embedding_status": embedding_status}
