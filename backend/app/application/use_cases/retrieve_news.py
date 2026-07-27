from dataclasses import dataclass

from app.domain.entities.news import News
from app.domain.repositories.retriever_repository import (
    IRetrieverRepository,
)


@dataclass
class RetrieveNewsRequest:
    """
    Entrada del caso de uso de recuperación RAG.

    Contiene el embedding generado por el modelo
    y los parámetros necesarios para la búsqueda.
    """

    vector: list[float]
    provider: str
    model: str
    limit: int = 5


@dataclass
class RetrieveNewsResponse:
    """
    Respuesta del caso de uso.

    Contiene las noticias más similares
    encontradas en el almacén vectorial.
    """

    news: list[News]


class RetrieveNewsUseCase:
    """
    Caso de uso encargado de recuperar noticias
    relevantes mediante búsqueda vectorial.

    Flujo:

    Vector consulta
          |
          v
    IRetrieverRepository
          |
          v
    Noticias similares


    No conoce:

    - PostgreSQL
    - pgvector
    - SQLAlchemy
    - LangChain
    - Gemini
    """

    def __init__(
        self,
        retriever_repository: IRetrieverRepository,
    ):
        self.retriever_repository = retriever_repository

    def execute(
        self,
        request: RetrieveNewsRequest,
    ) -> RetrieveNewsResponse:
        """
        Ejecuta la recuperación semántica.
        """

        limit = request.limit

        if limit <= 0:
            limit = 5

        if limit > 50:
            limit = 50

        results = self.retriever_repository.retrieve(
            vector=request.vector,
            provider=request.provider,
            model=request.model,
            limit=limit,
        )

        return RetrieveNewsResponse(news=results)
