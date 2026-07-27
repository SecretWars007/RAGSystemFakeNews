from uuid import UUID

from app.domain.entities.embedding import Embedding
from app.domain.repositories.embedding_repository import (
    IEmbeddingRepository,
)


class FakeEmbeddingRepository(IEmbeddingRepository):
    def __init__(self):

        self.embeddings: list[Embedding] = []

    def create(
        self,
        embedding: Embedding,
    ) -> Embedding:

        self.embeddings.append(embedding)

        return embedding

    def get_by_news_id(
        self,
        news_id: UUID,
    ) -> Embedding | None:

        for embedding in self.embeddings:
            if embedding.news_id == news_id:
                return embedding

        return None

    def search_similar(
        self,
        vector: list[float],
        provider: str,
        model: str,
        limit: int = 5,
    ) -> list[Embedding]:

        return self.embeddings[:limit]
