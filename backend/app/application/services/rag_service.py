from app.domain.repositories.retriever_repository import (
    IRetrieverRepository,
)
from app.infrastructure.ai.gemini_llm import (
    get_llm,
)


class RAGService:
    """
    Servicio principal del sistema RAG.

    Responsabilidades:

    - Recuperación de contexto relevante.
    - Construcción de prompts enriquecidos.
    - Consulta al modelo LLM.
    - Análisis de noticias.

    No conoce:
    - PostgreSQL
    - pgvector
    - SQLAlchemy

    Depende de contratos del dominio.
    """

    def __init__(
        self,
        retriever_repository: IRetrieverRepository,
    ):
        self.retriever_repository = retriever_repository
        self.llm = get_llm()

    def retrieve_context(
        self,
        embedding: list[float],
        provider: str,
        model: str,
        limit: int = 5,
    ):
        """
        Recupera noticias similares utilizando
        búsqueda vectorial.
        """

        return self.retriever_repository.retrieve(
            vector=embedding,
            provider=provider,
            model=model,
            limit=limit,
        )

    def invoke(
        self,
        prompt: str,
    ) -> str:
        """
        Ejecuta una consulta contra Gemini LLM.

        Garantiza siempre un retorno tipo str.
        """

        response = self.llm.invoke(prompt)

        if hasattr(response, "content"):
            content = response.content

            if isinstance(content, str):
                return content

            if isinstance(content, list):
                return "\n".join(str(item) for item in content)

        return str(response)

    def analyze_news(
        self,
        title: str,
        content: str,
        source: str,
        embedding: list[float],
        provider: str,
        model: str,
    ) -> str:
        """
        Analiza una noticia utilizando RAG.

        Flujo:

        Noticia
            |
            v
        Embedding
            |
            v
        Vector Search
            |
            v
        Contexto similar
            |
            v
        Gemini LLM
            |
            v
        Resultado JSON
        """

        similar_news = self.retrieve_context(
            embedding=embedding,
            provider=provider,
            model=model,
        )

        context = ""

        for news in similar_news:
            context += f"""
Título:
{news.title}

Contenido:
{news.content}

Fuente:
{news.source}

----------------------------------------
"""

        prompt = f"""
Eres un especialista en detección
de noticias falsas utilizando inteligencia artificial.

Analiza la siguiente noticia utilizando
el contexto recuperado desde la base vectorial.

NOTICIA

Título:
{title}

Contenido:
{content}

Fuente:
{source}


CONTEXTO RECUPERADO

{context}


Responde únicamente en formato JSON:

{{
    "label": "REAL o FAKE",
    "score": 0.95,
    "reason": "Explicación detallada",
    "evidence": "Evidencias encontradas"
}}
"""

        return self.invoke(prompt)

    def ask(
        self,
        question: str,
    ) -> str:
        """
        Permite consultas directas al modelo.
        """

        return self.invoke(question)
