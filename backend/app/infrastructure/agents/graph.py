from app.infrastructure.agents.analyzer_agent import (
    analyze_fake_news,
)
from app.infrastructure.agents.embedding_agent import (
    generate_embedding,
)
from app.infrastructure.agents.evidence_gate_agent import (
    evaluate_evidence,
    should_use_gemini,
)
from app.infrastructure.agents.news_agent import (
    analyze_news,
)
from app.infrastructure.agents.local_model_agent import classify_with_local_model
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

    graph.add_node(
        "local_model",
        classify_with_local_model,
    )

    # Nodo 3
    graph.add_node(
        "retriever",
        retrieve_similar_news,
    )

    graph.add_node(
        "evidence_gate",
        evaluate_evidence,
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
        "local_model",
    )

    graph.add_edge(
        "local_model",
        "embedding",
    )

    graph.add_edge(
        "embedding",
        "retriever",
    )

    graph.add_edge(
        "retriever",
        "evidence_gate",
    )

    graph.add_conditional_edges(
        "evidence_gate",
        should_use_gemini,
        {
            "analysis": "analysis",
            "storage": "storage",
        },
    )

    graph.add_edge(
        "analysis",
        "storage",
    )

    graph.set_finish_point(
        "storage",
    )

    return graph.compile()
