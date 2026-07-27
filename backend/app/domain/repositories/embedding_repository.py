from abc import ABC, abstractmethod
from uuid import UUID

from app.domain.entities.embedding import Embedding


class IEmbeddingRepository(ABC):
    @abstractmethod
    def create(
        self,
        embedding: Embedding,
    ) -> Embedding:
        """
        Guarda un embedding en la base de datos.
        """
        pass

    @abstractmethod
    def get_by_news_id(
        self,
        news_id: UUID,
    ) -> Embedding | None:
        """
        Obtiene el embedding asociado a una noticia.
        """
        pass

    @abstractmethod
    def search_similar(
        self,
        vector: list[float],
        provider: str,
        model: str,
        limit: int = 5,
    ) -> list[Embedding]:
        """
        Busca embeddings similares utilizando el mismo proveedor y modelo.
        """
        pass
