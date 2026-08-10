from datetime import datetime
from uuid import UUID, uuid4

from app.infrastructure.database.base import Base
from sqlalchemy import DateTime, String, Text
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column


class RefreshRequestModel(Base):
    """Deduplicated refresh request created when local evidence is insufficient."""

    __tablename__ = "knowledge_refresh_requests"

    id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    query_hash: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    query: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String(30), default="pending", nullable=False)
    requested_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    processed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
