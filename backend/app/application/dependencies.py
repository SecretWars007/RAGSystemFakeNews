from app.application.services.auth_service import AuthService
from app.application.services.news_service import NewsService
from app.application.use_cases.create_news import CreateNewsUseCase
from app.domain.repositories.news_repository import INewsRepository
from app.domain.repositories.user_repository import IUserRepository
from app.infrastructure.dependencies.repositories import (
    get_news_repository,
    get_user_repository,
)
from fastapi import Depends


def get_create_news_use_case(
    repository: INewsRepository = Depends(get_news_repository),
):

    return CreateNewsUseCase(repository)


def get_news_service(
    repository: INewsRepository = Depends(get_news_repository),
):

    return NewsService(repository)


def get_auth_service(
    repository: IUserRepository = Depends(get_user_repository),
):

    return AuthService(repository)
