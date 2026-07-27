from app.domain.entities.news import News
from app.domain.repositories.news_repository import (
    INewsRepository,
)


class CreateNewsUseCase:
    """
    Caso de uso encargado de crear noticias.

    Responsabilidad:

    - Validar la operación de creación.
    - Coordinar la persistencia de una noticia.

    No conoce:
    - PostgreSQL
    - SQLAlchemy
    - FastAPI
    - Gemini
    - pgvector
    """

    def __init__(
        self,
        repository: INewsRepository,
    ):
        self.repository = repository

    def execute(
        self,
        news: News,
    ) -> News:
        """
        Ejecuta la creación de una noticia.
        """

        return self.repository.create(news)
