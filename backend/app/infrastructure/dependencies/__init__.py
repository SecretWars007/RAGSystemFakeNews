from .repositories import (
    get_embedding_repository,
    get_history_repository,
    get_news_repository,
    get_user_repository,
)

__all__ = [
    "get_user_repository",
    "get_news_repository",
    "get_history_repository",
    "get_embedding_repository",
]
