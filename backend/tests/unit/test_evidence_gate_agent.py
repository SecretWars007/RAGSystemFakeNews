import json
from uuid import uuid4

from app.domain.entities.news import News
from app.infrastructure.agents.evidence_gate_agent import evaluate_evidence


def test_evidence_gate_abstains_without_relevant_context():
    state = {
        "similar_news": [
            News(
                id=uuid4(),
                title="Documento lejano",
                content="Sin relación semántica suficiente.",
                source="Fuente",
                similarity=0.42,
            )
        ]
    }

    result = evaluate_evidence(state)

    assert result["should_use_gemini"] is False
    assert result["status"] == "insufficient_evidence"
    assert json.loads(result["analysis"])["label"] == "UNVERIFIED"


def test_evidence_gate_allows_fallback_with_relevant_context():
    state = {
        "similar_news": [
            News(
                id=uuid4(),
                title="Documento relevante",
                content="Evidencia local.",
                source="Fuente",
                similarity=0.86,
            )
        ]
    }

    result = evaluate_evidence(state)

    assert result["should_use_gemini"] is True
    assert result["status"] == "evidence_available"
    assert len(result["relevant_news"]) == 1


def test_evidence_gate_uses_confident_local_model_with_evidence():
    state = {
        "local_model_available": True,
        "local_label": "FAKE",
        "local_confidence": 0.91,
        "local_model_uri": "models:/fake_news_classifier@champion",
        "similar_news": [
            News(id=uuid4(), title="Verificación", content="Evidencia", source="Fuente", similarity=0.88)
        ],
    }

    result = evaluate_evidence(state)

    assert result["should_use_gemini"] is False
    assert json.loads(result["analysis"])["decision_source"] == "local_model"
