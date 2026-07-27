from uuid import UUID, uuid4

from app.application.dependencies import get_news_service
from app.application.services.news_service import NewsService
from app.domain.entities.news import News
from app.presentation.schemas.news_schema import (
    NewsCreateSchema,
    NewsResponseSchema,
)
from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter(
    prefix="/news",
    tags=["News"],
)


@router.post(
    "",
    response_model=NewsResponseSchema,
    status_code=status.HTTP_201_CREATED,
)
def create_news(
    data: NewsCreateSchema,
    service: NewsService = Depends(get_news_service),
):

    news = News(
        id=uuid4(),
        title=data.title,
        content=data.content,
        source=data.source,
        author=data.author,
        url=data.url,
        language=data.language,
        country=data.country,
        published_at=data.published_at,
        is_fake=data.is_fake,
    )

    return service.create(news)


@router.get(
    "",
    response_model=list[NewsResponseSchema],
)
def get_all_news(
    service: NewsService = Depends(get_news_service),
):

    return service.get_all()


@router.get(
    "/{news_id}",
    response_model=NewsResponseSchema,
)
def get_news_by_id(
    news_id: UUID,
    service: NewsService = Depends(get_news_service),
):

    news = service.get_by_id(news_id)

    if news is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="News not found",
        )

    return news


@router.put(
    "/{news_id}",
    response_model=NewsResponseSchema,
)
def update_news(
    news_id: UUID,
    data: NewsCreateSchema,
    service: NewsService = Depends(get_news_service),
):

    existing_news = service.get_by_id(news_id)

    if existing_news is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="News not found",
        )

    news = News(
        id=news_id,
        title=data.title,
        content=data.content,
        source=data.source,
        author=data.author,
        url=data.url,
        language=data.language,
        country=data.country,
        published_at=data.published_at,
        is_fake=data.is_fake,
        created_at=existing_news.created_at,
        updated_at=existing_news.updated_at,
    )

    return service.update(news)


@router.delete(
    "/{news_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_news(
    news_id: UUID,
    service: NewsService = Depends(get_news_service),
):

    existing_news = service.get_by_id(news_id)

    if existing_news is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="News not found",
        )

    service.delete(news_id)

    return None
