from uuid import UUID, uuid4

from app.infrastructure.database.base import Base
from pgvector.sqlalchemy import Vector
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column


class EmbeddingModel(Base):
    __tablename__ = "embeddings"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    news_id: Mapped[UUID] = mapped_column(ForeignKey("news.id"), nullable=False)

    vector: Mapped[list[float]] = mapped_column(Vector(1536), nullable=False)
