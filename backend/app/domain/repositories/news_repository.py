from abc import ABC, abstractmethod
from uuid import UUID

from app.domain.entities.news import News


class INewsRepository(ABC):
    """
    Contrato del repositorio de noticias.

    Define las operaciones que debe implementar
    cualquier fuente de almacenamiento.

    La capa dominio no conoce:
    - PostgreSQL
    - SQLAlchemy
    - MongoDB
    - APIs externas
    """

    @abstractmethod
    def create(
        self,
        news: News,
    ) -> News:
        """
        Crea una noticia.
        """
        ...

    @abstractmethod
    def get_by_id(
        self,
        news_id: UUID,
    ) -> News | None:
        """
        Obtiene una noticia por identificador.
        """
        ...

    @abstractmethod
    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
    ) -> list[News]:
        """
        Obtiene noticias con paginación.

        Args:
            skip:
                Cantidad de registros a omitir.

            limit:
                Cantidad máxima de registros.
        """
        ...

    @abstractmethod
    def update(
        self,
        news: News,
    ) -> News:
        """
        Actualiza una noticia existente.
        """
        ...

    @abstractmethod
    def delete(
        self,
        news_id: UUID,
    ) -> None:
        """
        Elimina una noticia.
        """
        ...
