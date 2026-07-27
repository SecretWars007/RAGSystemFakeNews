from uuid import UUID, uuid4

from app.infrastructure.database.base import Base
from sqlalchemy import ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column


class RAGResponseModel(Base):
    __tablename__ = "rag_responses"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    query_id: Mapped[UUID] = mapped_column(
        ForeignKey("query_history.id"), nullable=False
    )

    answer: Mapped[str] = mapped_column(Text, nullable=False)

    explanation: Mapped[str] = mapped_column(Text, nullable=False)
