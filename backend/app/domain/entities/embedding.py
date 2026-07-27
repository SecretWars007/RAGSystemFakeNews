from dataclasses import dataclass
from datetime import datetime
from uuid import UUID


@dataclass(slots=True)
class Embedding:

    id: UUID

    news_id: UUID

    provider: str

    model: str

    dimensions: int

    vector: list[float]

    created_at: datetime