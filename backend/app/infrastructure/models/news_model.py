from datetime import datetime
from uuid import UUID, uuid4

from app.infrastructure.database.base import Base
from sqlalchemy import Boolean, DateTime, String, Text
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column


class NewsModel(Base):
    __tablename__ = "news"

    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        primary_key=True,
        default=uuid4,
    )

    title: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    source: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    author: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    url: Mapped[str | None] = mapped_column(
        String(1000),
        nullable=True,
    )

    language: Mapped[str] = mapped_column(
        String(20),
        default="es",
        nullable=False,
    )

    country: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    published_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    is_fake: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )
