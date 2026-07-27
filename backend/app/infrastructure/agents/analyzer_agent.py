import json
from typing import Any

from app.infrastructure.agents.state import NewsRAGState
from app.infrastructure.ai.gemini_llm import (
    get_llm,
)


def analyze_fake_news(
    state: NewsRAGState,
) -> NewsRAGState:
    """
    Nodo LangGraph encargado de analizar
    una noticia utilizando Gemini.

    Flujo:

    Noticias similares
          |
          v
    Construcción contexto
          |
          v
    Gemini LLM
          |
          v
    analysis + score
    """

    title = state.get("title")

    content = state.get("content")

    source = state.get("source")

    similar_news = state.get(
        "similar_news",
        [],
    )

    if not title:
        raise ValueError("El título de la noticia es obligatorio")

    if not content:
        raise ValueError("El contenido de la noticia es obligatorio")

    if not source:
        raise ValueError("La fuente de la noticia es obligatoria")

    llm = get_llm()

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
Eres un experto en detección de noticias falsas
utilizando inteligencia artificial.


Analiza la siguiente noticia utilizando
las noticias similares como contexto.


NOTICIA

Título:
{title}

Contenido:
{content}

Fuente:
{source}


NOTICIAS SIMILARES

{context}


Devuelve únicamente JSON:

{{
    "label": "REAL o FAKE",
    "score": 0.95,
    "reason": "Explicación detallada",
    "evidence": "Evidencias encontradas"
}}
"""

    response = llm.invoke(prompt)

    if hasattr(response, "content"):
        response_content = response.content

        if isinstance(
            response_content,
            str,
        ):
            analysis_text = response_content

        elif isinstance(
            response_content,
            list,
        ):
            analysis_text = "\n".join(str(item) for item in response_content)

        else:
            analysis_text = str(response_content)

    else:
        analysis_text = str(response)

    state["analysis"] = analysis_text

    try:
        data: dict[str, Any] = json.loads(analysis_text)

        score = data.get("score")

        if isinstance(
            score,
            (int, float),
        ):
            state["score"] = float(score)

    except json.JSONDecodeError:
        state["score"] = 0.0

    state["status"] = "analysis_completed"

    return state
