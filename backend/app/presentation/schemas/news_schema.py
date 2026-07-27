from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class NewsCreateSchema(BaseModel):
    title: str
    content: str
    source: str
    author: str | None = None
    url: str | None = None
    language: str = "es"
    country: str | None = None
    published_at: datetime | None = None
    is_fake: bool | None = None


class NewsResponseSchema(BaseModel):
    id: UUID
    title: str
    content: str
    source: str
    author: str | None = None
    url: str | None = None
    language: str
    country: str | None = None
    published_at: datetime | None = None
    is_fake: bool | None = None

    class Config:
        from_attributes = True
