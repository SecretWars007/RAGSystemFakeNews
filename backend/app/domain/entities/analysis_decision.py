from dataclasses import dataclass, field
from enum import StrEnum


class AnalysisLabel(StrEnum):
    REAL = "REAL"
    FAKE = "FAKE"
    MISLEADING = "MISLEADING"
    UNVERIFIED = "UNVERIFIED"


class DecisionSource(StrEnum):
    LOCAL_MODEL = "local_model"
    KNOWLEDGE_BASE = "knowledge_base"
    KNOWLEDGE_BASE_UPDATED = "knowledge_base_updated"
    GEMINI_FALLBACK = "gemini_fallback"
    ABSTAINED = "abstained"


@dataclass(frozen=True)
class EvidenceItem:
    title: str
    source: str
    url: str | None = None
    published_at: str | None = None
    similarity: float | None = None


@dataclass(frozen=True)
class AnalysisDecision:
    label: AnalysisLabel
    confidence: float
    source: DecisionSource
    reason: str
    evidence: list[EvidenceItem] = field(default_factory=list)
