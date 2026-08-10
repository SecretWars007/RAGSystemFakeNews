from datetime import datetime, timezone
from uuid import UUID, uuid4

from app.infrastructure.database.base import Base
from sqlalchemy import Boolean, DateTime, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column


class TrustedSourceModel(Base):
    """A reviewed source that the ingestion worker is allowed to crawl."""

    __tablename__ = "trusted_sources"

    id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    base_url: Mapped[str] = mapped_column(String(1000), unique=True, nullable=False)
    source_type: Mapped[str] = mapped_column(String(40), nullable=False)
    priority: Mapped[int] = mapped_column(Integer, default=100, nullable=False)
    crawl_interval_minutes: Mapped[int] = mapped_column(Integer, default=1440, nullable=False)
    extraction_config: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    last_crawled_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(tz=timezone.utc), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(tz=timezone.utc), onupdate=lambda: datetime.now(tz=timezone.utc), nullable=False
    )
