from dataclasses import dataclass
from uuid import UUID


@dataclass
class News:
    id: UUID

    title: str

    content: str

    source: str | None
