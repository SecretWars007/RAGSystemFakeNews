from dataclasses import dataclass
from uuid import UUID


@dataclass
class QueryHistory:
    id: UUID

    user_id: UUID

    query: str
