from app.infrastructure.agents.state import NewsRAGState


def analyze_news(
    state: NewsRAGState,
) -> NewsRAGState:
    """
    Nodo inicial del grafo RAG.

    Prepara el texto completo de la noticia
    que será enviado al modelo de embeddings.

    Flujo:

    title + content
          |
          v
    Texto combinado
          |
          v
    Embedding Agent
    """

    title = state.get("title")

    content = state.get("content")

    if not title:
        raise ValueError("El título de la noticia es obligatorio")

    if not content:
        raise ValueError("El contenido de la noticia es obligatorio")

    text = f"""
Título:
{title}

Contenido:
{content}
"""

    state["content"] = text

    state["status"] = "news_analyzed"

    return state
