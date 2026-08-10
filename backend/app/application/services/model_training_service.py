from dataclasses import dataclass

from app.core.config import settings


@dataclass(frozen=True)
class TrainingResult:
    rows_used: int
    f1_macro: float
    candidate_model_uri: str


class ModelTrainingService:
    """Offline training from the administrator-configured dataset only."""

    def train_configured_dataset(self) -> TrainingResult:
        if not settings.TRAINING_DATASET_PATH:
            raise ValueError("TRAINING_DATASET_PATH no está configurado")

        import mlflow
        import mlflow.sklearn
        import pandas as pd
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.linear_model import LogisticRegression
        from sklearn.metrics import f1_score
        from sklearn.model_selection import GroupShuffleSplit
        from sklearn.pipeline import Pipeline

        data = pd.read_csv(settings.TRAINING_DATASET_PATH)
        if not {"title", "text", "label"}.issubset(data.columns):
            raise ValueError("El dataset debe incluir title, text y label")
        data = data[data["label"].isin(["REAL", "FAKE"])].copy()
        data["document"] = data["title"].fillna("") + "\n\n" + data["text"].fillna("")
        data = data[data["document"].str.len() >= 20].drop_duplicates("document")
        if len(data) < 20:
            raise ValueError("No hay suficientes documentos únicos para entrenar")

        groups = data["content_hash"] if "content_hash" in data.columns else data["document"]
        splitter = GroupShuffleSplit(n_splits=1, test_size=0.2, random_state=42)
        train_index, test_index = next(splitter.split(data["document"], data["label"], groups=groups))
        train, test = data.iloc[train_index], data.iloc[test_index]
        pipeline = Pipeline([
            ("vectorizer", TfidfVectorizer(ngram_range=(1, 2), max_features=30_000)),
            ("classifier", LogisticRegression(max_iter=1_000, class_weight="balanced", random_state=42)),
        ])
        pipeline.fit(train["document"], train["label"])
        f1_macro = float(f1_score(test["label"], pipeline.predict(test["document"]), average="macro"))

        mlflow.set_tracking_uri(settings.MLFLOW_TRACKING_URI)
        mlflow.set_experiment(settings.MLFLOW_EXPERIMENT_NAME)
        with mlflow.start_run():
            mlflow.log_params({"vectorizer": "tfidf_1_2gram", "classifier": "logistic_regression", "random_state": 42})
            mlflow.log_metrics({"f1_macro": f1_macro, "rows_used": len(data), "test_rows": len(test)})
            model_info = mlflow.sklearn.log_model(pipeline, name="model")
            registered = mlflow.register_model(model_info.model_uri, "fake_news_classifier")

        return TrainingResult(
            rows_used=len(data),
            f1_macro=f1_macro,
            candidate_model_uri=f"models:/fake_news_classifier/{registered.version}",
        )
