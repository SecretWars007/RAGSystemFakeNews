from uuid import UUID

from app.domain.entities.news import News
from app.domain.repositories.news_repository import (
    INewsRepository,
)


class NewsService:
    """
    Servicio de aplicación encargado de la gestión
    de noticias.

    Responsabilidades:

    - Crear noticias.
    - Consultar noticias.
    - Actualizar noticias.
    - Eliminar noticias.

    No conoce:
    - PostgreSQL
    - SQLAlchemy
    - FastAPI
    - Embeddings
    - Gemini

    Solo depende del contrato:
    INewsRepository
    """

    def __init__(
        self,
        repository: INewsRepository,
    ):
        self.repository = repository

    def create(
        self,
        news: News,
    ) -> News:
        """
        Crea una nueva noticia.
        """

        return self.repository.create(news)

    def get_by_id(
        self,
        news_id: UUID,
    ) -> News | None:
        """
        Obtiene una noticia por UUID.
        """

        return self.repository.get_by_id(news_id)

    def get_all(
        self,
        skip: int = 0,
        limit: int = 1000,
    ) -> list[News]:
        """
        Obtiene noticias paginadas.
        """

        if skip < 0:
            skip = 0

        if limit <= 0:
            limit = 1000

        return self.repository.get_all(
            skip=skip,
            limit=limit,
        )

    def update(
        self,
        news: News,
    ) -> News:
        """
        Actualiza una noticia existente.
        """

        return self.repository.update(news)

    def delete(
        self,
        news_id: UUID,
    ) -> None:
        """
        Elimina una noticia.
        """

        self.repository.delete(news_id)

    def exists(
        self,
        news_id: UUID,
    ) -> bool:
        """
        Verifica si una noticia existe.
        """

        return self.get_by_id(news_id) is not None
