from app.infrastructure.agents.state import NewsRAGState
from app.infrastructure.ai.local_classifier import get_local_classifier


def classify_with_local_model(state: NewsRAGState) -> NewsRAGState:
    """First decision stage. It never calls an external LLM."""
    text = f"{state.get('title', '')}\n\n{state.get('content', '')}".strip()
    prediction = get_local_classifier().predict(text)
    if prediction is None:
        state["local_model_available"] = False
        state["status"] = "local_model_unavailable"
        return state

    state["local_model_available"] = True
    state["local_label"] = prediction.label
    state["local_confidence"] = prediction.confidence
    state["local_model_uri"] = prediction.model_uri
    state["status"] = "local_model_predicted"
    return state
