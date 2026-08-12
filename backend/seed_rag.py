import os
import sys
import hashlib
from uuid import uuid4
from datetime import datetime, timezone

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.infrastructure.database.session import SessionLocal
from app.infrastructure.models.trusted_source_model import TrustedSourceModel
from app.infrastructure.models.knowledge_document_model import KnowledgeDocumentModel, KnowledgeDocumentEmbeddingModel
from app.infrastructure.ai.gemini_embedding import GeminiEmbeddingService

def seed_rag():
    session = SessionLocal()
    
    try:
        source = session.query(TrustedSourceModel).filter_by(name="BCB Oficial").first()
        if not source:
            source = TrustedSourceModel(
                name="BCB Oficial",
                base_url="https://www.bcb.gob.bo",
                source_type="government",
            )
            session.add(source)
            session.commit()
            session.refresh(source)
            
        content = "El Banco Central de Bolivia (BCB) desmiente categóricamente las publicaciones en redes sociales que afirman que el dólar bajó a 2 Bs. El tipo de cambio oficial se mantiene estable y fijo en 6.96 Bs para la venta y 6.86 Bs para la compra. Pedimos a la población no dejarse engañar por noticias falsas y bulos que buscan generar especulación."
        content_hash = hashlib.sha256(content.encode('utf-8')).hexdigest()
        
        doc = session.query(KnowledgeDocumentModel).filter_by(content_hash=content_hash).first()
        if not doc:
            doc = KnowledgeDocumentModel(
                source_id=source.id,
                title="Comunicado Oficial BCB: Tipo de Cambio se Mantiene",
                content=content,
                canonical_url="https://www.bcb.gob.bo/comunicado-oficial-dolar",
                content_hash=content_hash,
                published_at=datetime.now(timezone.utc),
                validation_status="verified",
                fact_label="real"
            )
            session.add(doc)
            session.commit()
            session.refresh(doc)
        
        existing_emb = session.query(KnowledgeDocumentEmbeddingModel).filter_by(document_id=doc.id).first()
        if not existing_emb:
            print("Generando embedding con Gemini...")
            embedder = GeminiEmbeddingService()
            vector = embedder.generate(content)
            
            emb = KnowledgeDocumentEmbeddingModel(
                document_id=doc.id,
                provider="google",
                model=embedder.model_name,
                dimensions=len(vector),
                vector=vector
            )
            session.add(emb)
            session.commit()
        
        print("¡Éxito! Se sembró la base de conocimientos RAG (knowledge_documents) y su embedding para el demo del dólar.")
        
    except Exception as e:
        session.rollback()
        print(f"Error: {e}")
    finally:
        session.close()

if __name__ == '__main__':
    seed_rag()
