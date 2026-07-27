from app.infrastructure.agents.state import NewsRAGState

from app.infrastructure.dependencies.agent_dependencies import (
    get_agent_retriever_repository,
)



def retrieve_similar_news(
    state: NewsRAGState,
) -> NewsRAGState:
    """
    Nodo LangGraph encargado de recuperar
    noticias similares utilizando búsqueda vectorial.

    Flujo:

    Embedding
        |
        v
    RetrieverRepository
        |
        v
    Noticias similares
        |
        v
    NewsRAGState
    """


    embedding = state.get(
        "embedding"
    )

    provider = state.get(
        "provider"
    )

    model = state.get(
        "model"
    )


    if embedding is None:
        raise ValueError(
            "El embedding es obligatorio para recuperar noticias similares"
        )


    if not provider:
        raise ValueError(
            "El provider del embedding es obligatorio"
        )


    if not model:
        raise ValueError(
            "El modelo del embedding es obligatorio"
        )



    repository = get_agent_retriever_repository()



    similar_news = repository.retrieve(
        vector=embedding,
        provider=provider,
        model=model,
        limit=5,
    )



    state["similar_news"] = similar_news


    state["status"] = (
        "context_retrieved"
    )


    return state