from langchain_google_genai import GoogleGenerativeAIEmbeddings


class GeminiEmbeddingService:
    """
    Implementación concreta del proveedor
    de embeddings utilizando Google Gemini.

    Esta clase pertenece a Infrastructure.

    Responsabilidad:
    - Comunicarse con Gemini API.
    - Generar vectores embeddings.

    No contiene lógica de negocio.
    """

    def __init__(
        self,
        model: str = "models/gemini-embedding-001",
    ):
        self.model_name = model

        self.client = GoogleGenerativeAIEmbeddings(
            model=self.model_name,
        )

    def generate(
        self,
        text: str,
    ) -> list[float]:
        """
        Genera un embedding para un texto.

        Args:
            text:
                Texto de entrada.

        Returns:
            Vector numérico generado por Gemini.
        """

        return self.client.embed_query(text)

    def generate_documents(
        self,
        texts: list[str],
    ) -> list[list[float]]:
        """
        Genera embeddings para múltiples textos.

        Utilizado para indexación masiva de noticias.
        """

        return self.client.embed_documents(texts)


def get_embedding_model() -> GeminiEmbeddingService:
    """
    Factory para obtener el servicio
    de embeddings Gemini.
    """

    return GeminiEmbeddingService()
