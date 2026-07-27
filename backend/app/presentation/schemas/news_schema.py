from uuid import UUID

from pydantic import BaseModel


class NewsCreateSchema(BaseModel):
    title: str

    content: str

    source: str | None = None


class NewsResponseSchema(BaseModel):
    id: UUID

    title: str

    content: str

    source: str | None = None
