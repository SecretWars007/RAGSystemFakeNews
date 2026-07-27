from app.infrastructure.agents.state import NewsRAGState

from app.infrastructure.ai.gemini_embedding import (
    get_embedding_model,
)


def generate_embedding(
    state: NewsRAGState,
) -> NewsRAGState:
    """
    Nodo LangGraph encargado de generar
    el embedding de una noticia.

    Flujo:

    Contenido noticia
          |
          v
    Gemini Embedding
          |
          v
    Vector numérico
          |
          v
    NewsRAGState
    """

    content = state.get("content")

    if not content:
        raise ValueError(
            "El contenido de la noticia es obligatorio para generar embedding"
        )

    embedding_service = get_embedding_model()

    vector = embedding_service.generate(content)

    state["embedding"] = vector

    state["status"] = "embedding_created"

    return state
