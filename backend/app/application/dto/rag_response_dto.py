from dataclasses import dataclass
from uuid import UUID


@dataclass
class RAGResponseDTO:
    id: UUID

    answer: str

    explanation: str
