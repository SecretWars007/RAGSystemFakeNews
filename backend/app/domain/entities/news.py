from dataclasses import dataclass
from datetime import datetime
from uuid import UUID


@dataclass
class News:
    id: UUID
    title: str
    content: str
    source: str
    author: str | None = None
    url: str | None = None
    language: str = "es"
    country: str | None = None
    published_at: datetime | None = None
    is_fake: bool | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None
