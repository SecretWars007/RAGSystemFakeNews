from dataclasses import dataclass

from app.core.config import settings


@dataclass(frozen=True)
class LocalPrediction:
    label: str
    confidence: float
    model_uri: str


class LocalClassifier:
    """Loads the promoted MLflow model lazily and fails closed when unavailable."""

    def __init__(self) -> None:
        self._model = None
        self._load_attempted = False

    def _load(self) -> None:
        if self._load_attempted:
            return
        self._load_attempted = True
        try:
            import mlflow
            import mlflow.sklearn

            mlflow.set_tracking_uri(settings.MLFLOW_TRACKING_URI)
            self._model = mlflow.sklearn.load_model(settings.LOCAL_MODEL_URI)
        except Exception:
            self._model = None

    def predict(self, text: str) -> LocalPrediction | None:
        self._load()
        if self._model is None:
            return None

        probabilities = self._model.predict_proba([text])[0]
        labels = self._model.classes_
        index = max(range(len(probabilities)), key=lambda item: probabilities[item])
        return LocalPrediction(
            label=str(labels[index]),
            confidence=float(probabilities[index]),
            model_uri=settings.LOCAL_MODEL_URI,
        )


_classifier = LocalClassifier()


def get_local_classifier() -> LocalClassifier:
    return _classifier
