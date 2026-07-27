from app.application.use_cases.create_news import CreateNewsUseCase
from app.domain.repositories.news_repository import INewsRepository
from app.infrastructure.dependencies import get_news_repository
from app.infrastructure.dependencies.repositories import get_news_repository
from fastapi import Depends


def get_create_news_use_case(
    repository: INewsRepository = Depends(get_news_repository),
):

    return CreateNewsUseCase(repository)
