import json

from app.core.config import settings
from app.infrastructure.agents.state import NewsRAGState


def evaluate_evidence(state: NewsRAGState) -> NewsRAGState:
    """Stops the pipeline when retrieval cannot support a factual verdict.

    Gemini must not be asked to guess when the local knowledge base has no
    sufficiently related documents. A future local classifier will be added
    before this gate; until then the safe result is ``UNVERIFIED``.
    """

    similar_news = state.get("similar_news", [])
    relevant_news = [
        news
        for news in similar_news
        if (news.similarity or 0.0) >= settings.MIN_RETRIEVAL_SIMILARITY
    ]

    state["relevant_news"] = relevant_news

    if len(relevant_news) >= settings.MIN_EVIDENCE_DOCUMENTS:
        if (
            state.get("local_model_available")
            and (state.get("local_confidence") or 0.0) >= settings.MIN_LOCAL_MODEL_CONFIDENCE
            and state.get("local_label")
        ):
            state["should_use_gemini"] = False
            state["score"] = state["local_confidence"]
            state["analysis"] = json.dumps(
                {
                    "label": state["local_label"],
                    "score": state["local_confidence"],
                    "reason": "Veredicto del modelo local respaldado por evidencia recuperada.",
                    "evidence": [
                        {"title": news.title, "source": news.source, "url": news.url, "similarity": news.similarity}
                        for news in relevant_news
                    ],
                    "decision_source": "local_model",
                    "model_uri": state.get("local_model_uri"),
                },
                ensure_ascii=False,
            )
            state["status"] = "completed"
            return state
        state["should_use_gemini"] = True
        state["status"] = "evidence_available"
        return state

    state["should_use_gemini"] = False
    state["score"] = 0.0
    state["analysis"] = json.dumps(
        {
            "label": "UNVERIFIED",
            "score": 0.0,
            "reason": (
                "La base de conocimiento no contiene evidencia local "
                "suficientemente relacionada para emitir un veredicto."
            ),
            "evidence": [],
            "decision_source": "abstained",
        },
        ensure_ascii=False,
    )
    state["status"] = "insufficient_evidence"
    return state


def should_use_gemini(state: NewsRAGState) -> str:
    return "analysis" if state.get("should_use_gemini") else "storage"
