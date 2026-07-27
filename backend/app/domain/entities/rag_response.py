from dataclasses import dataclass
from uuid import UUID


@dataclass
class RAGResponse:
    id: UUID

    query_id: UUID

    answer: str

    explanation: str
