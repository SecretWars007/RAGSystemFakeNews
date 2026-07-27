from abc import ABC, abstractmethod

from app.domain.entities.news import News


class IRetrieverRepository(ABC):
    """
    Contrato para recuperación semántica de documentos.

    La capa dominio no conoce:
    - PostgreSQL
    - pgvector
    - Pinecone
    - Chroma
    - Weaviate
    - Milvus

    Solo conoce la operación:
    recuperar documentos similares.
    """

    @abstractmethod
    def retrieve(
        self,
        vector: list[float],
        provider: str,
        model: str,
        limit: int = 5,
    ) -> list[News]:
        """
        Recupera noticias similares mediante
        búsqueda vectorial.

        Args:
            vector:
                Embedding generado de la consulta.

            provider:
                Proveedor del modelo embedding.
                Ejemplo:
                - gemini
                - openai

            model:
                Modelo embedding utilizado.

            limit:
                Número máximo de documentos.

        Returns:
            Lista de entidades News similares.
        """

        raise NotImplementedError
