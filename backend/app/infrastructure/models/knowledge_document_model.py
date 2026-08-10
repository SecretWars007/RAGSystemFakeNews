from datetime import datetime
from uuid import UUID, uuid4

from app.infrastructure.database.base import Base
from pgvector.sqlalchemy import Vector
from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column


class KnowledgeDocumentModel(Base):
    """Validated web content available to the RAG knowledge base."""

    __tablename__ = "knowledge_documents"
    __table_args__ = (UniqueConstraint("canonical_url", name="uq_knowledge_documents_canonical_url"),)

    id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    source_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("trusted_sources.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    canonical_url: Mapped[str] = mapped_column(String(1000), nullable=False)
    content_hash: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    published_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    fetched_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    validation_status: Mapped[str] = mapped_column(String(40), default="pending", nullable=False)
    fact_label: Mapped[str | None] = mapped_column(String(40), nullable=True)
    is_training_eligible: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)


class KnowledgeDocumentEmbeddingModel(Base):
    __tablename__ = "knowledge_document_embeddings"
    __table_args__ = (
        UniqueConstraint(
            "document_id", "provider", "model", name="uq_knowledge_document_embedding_model"
        ),
    )

    id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    document_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True), ForeignKey("knowledge_documents.id", ondelete="CASCADE"), nullable=False
    )
    provider: Mapped[str] = mapped_column(String(50), nullable=False)
    model: Mapped[str] = mapped_column(String(120), nullable=False)
    dimensions: Mapped[int] = mapped_column(Integer, nullable=False)
    vector: Mapped[list[float]] = mapped_column(Vector(3072), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
