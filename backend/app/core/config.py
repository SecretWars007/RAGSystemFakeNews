from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "FakeNewsRAGSystem"

    DATABASE_URL: str = (
        "postgresql+psycopg://postgres:postgres@postgres:5432/fake_news_db"
    )

    GOOGLE_API_KEY: str = ""

    MIN_RETRIEVAL_SIMILARITY: float = 0.70

    MIN_EVIDENCE_DOCUMENTS: int = 1

    MLFLOW_TRACKING_URI: str = "http://mlflow:5000"

    LOCAL_MODEL_URI: str = "models:/fake_news_classifier@champion"

    MIN_LOCAL_MODEL_CONFIDENCE: float = 0.80

    TRAINING_DATASET_PATH: str = ""

    MLFLOW_EXPERIMENT_NAME: str = "fake-news-training"

    ALLOW_MODEL_TRAINING: bool = False

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )


settings = Settings()
