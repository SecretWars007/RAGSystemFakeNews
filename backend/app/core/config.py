from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "FakeNewsRAGSystem"

    DATABASE_URL: str = (
        "postgresql+psycopg://postgres:postgres@postgres:5432/fake_news_db"
    )

    GOOGLE_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )


settings = Settings()
