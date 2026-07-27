from uuid import UUID

from app.domain.entities.embedding import Embedding
from app.domain.repositories.embedding_repository import (
    IEmbeddingRepository,
)


class EmbeddingService:
    """
    Servicio de aplicación encargado de la gestión
    de embeddings.

    Responsabilidades:
    - Crear embeddings persistidos.
    - Consultar embeddings asociados a noticias.
    - Validar existencia de embeddings.
    - Ejecutar búsquedas vectoriales sobre embeddings.

    No conoce:
    - PostgreSQL
    - pgvector
    - SQLAlchemy
    - Gemini
    - OpenAI

    Solo depende del contrato:
    IEmbeddingRepository
    """


    def __init__(
        self,
        repository: IEmbeddingRepository,
    ):
        self.repository = repository


    def save(
        self,
        embedding: Embedding,
    ) -> Embedding:
        """
        Guarda un embedding.
        """

        return self.repository.create(
            embedding
        )


    def get_by_news(
        self,
        news_id: UUID,
    ) -> Embedding | None:
        """
        Obtiene el embedding asociado
        a una noticia.
        """

        return self.repository.get_by_news_id(
            news_id
        )


    def search_embeddings(
        self,
        vector: list[float],
        provider: str,
        model: str,
        limit: int = 5,
    ) -> list[Embedding]:
        """
        Busca embeddings similares utilizando
        búsqueda vectorial.

        Args:
            vector:
                Vector generado por el modelo embedding.

            provider:
                Proveedor del embedding.
                Ejemplo:
                - gemini
                - openai

            model:
                Modelo utilizado.

            limit:
                Cantidad máxima de resultados.
        """


        if limit <= 0:
            limit = 5


        if limit > 50:
            limit = 50


        return self.repository.search_similar(
            vector=vector,
            provider=provider,
            model=model,
            limit=limit,
        )


    def exists(
        self,
        news_id: UUID,
    ) -> bool:
        """
        Verifica si una noticia ya posee
        un embedding almacenado.
        """

        return (
            self.get_by_news(news_id)
            is not None
        )


    def save_if_not_exists(
        self,
        embedding: Embedding,
    ) -> Embedding:
        """
        Guarda un embedding únicamente si
        todavía no existe para la noticia.
        """


        current = self.get_by_news(
            embedding.news_id
        )


        if current is not None:
            return current


        return self.save(
            embedding
        )