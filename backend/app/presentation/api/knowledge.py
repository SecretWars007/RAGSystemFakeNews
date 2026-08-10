from app.infrastructure.database.session import get_db
from app.infrastructure.models.knowledge_document_model import (
    KnowledgeDocumentEmbeddingModel,
    KnowledgeDocumentModel,
)
from app.infrastructure.models.refresh_request_model import RefreshRequestModel
from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session


router = APIRouter(prefix="/knowledge", tags=["Knowledge"])


@router.get("/status")
def knowledge_status(session: Session = Depends(get_db)):
    documents = session.query(func.count(KnowledgeDocumentModel.id)).scalar() or 0
    embeddings = session.query(func.count(KnowledgeDocumentEmbeddingModel.id)).scalar() or 0
    pending_refreshes = (
        session.query(func.count(RefreshRequestModel.id))
        .filter(RefreshRequestModel.status == "pending")
        .scalar()
        or 0
    )
    last_indexed_at = session.query(func.max(KnowledgeDocumentModel.fetched_at)).scalar()
    return {
        "documents": documents,
        "embeddings": embeddings,
        "pending_refreshes": pending_refreshes,
        "last_indexed_at": last_indexed_at,
    }
