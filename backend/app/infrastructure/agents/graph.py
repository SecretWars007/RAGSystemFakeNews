from app.infrastructure.agents.analyzer_agent import (
    analyze_fake_news,
)
from app.infrastructure.agents.embedding_agent import (
    generate_embedding,
)
from app.infrastructure.agents.news_agent import (
    analyze_news,
)
from app.infrastructure.agents.retriever_agent import (
    retrieve_similar_news,
)
from app.infrastructure.agents.state import (
    NewsRAGState,
)
from app.infrastructure.agents.storage_agent import (
    save_embedding,
)
from langgraph.graph import StateGraph


def create_news_rag_graph():
    """
    Construye el grafo LangGraph
    del sistema FakeNews RAG.

    Flujo:

    Noticia
      |
      v
    Preparación
      |
      v
    Embedding Gemini
      |
      v
    Recuperación pgvector
      |
      v
    Análisis Gemini
      |
      v
    Persistencia
    """

    graph = StateGraph(NewsRAGState)

    # Nodo 1
    graph.add_node(
        "analyze_news",
        analyze_news,
    )

    # Nodo 2
    graph.add_node(
        "embedding",
        generate_embedding,
    )

    # Nodo 3
    graph.add_node(
        "retriever",
        retrieve_similar_news,
    )

    # Nodo 4
    graph.add_node(
        "analysis",
        analyze_fake_news,
    )

    # Nodo 5
    graph.add_node(
        "storage",
        save_embedding,
    )

    graph.set_entry_point(
        "analyze_news",
    )

    graph.add_edge(
        "analyze_news",
        "embedding",
    )

    graph.add_edge(
        "embedding",
        "retriever",
    )

    graph.add_edge(
        "retriever",
        "analysis",
    )

    graph.add_edge(
        "analysis",
        "storage",
    )

    graph.set_finish_point(
        "storage",
    )

    return graph.compile()
