from uuid import UUID, uuid4

from app.application.services.trusted_source_service import TrustedSourceService
from app.domain.entities.trusted_source import TrustedSource
from app.presentation.schemas.trusted_source_schema import TrustedSourceResponseSchema, TrustedSourceUpsertSchema
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.application.dependencies import get_trusted_source_service


router = APIRouter(prefix="/sources", tags=["Trusted sources"])


@router.post("", response_model=TrustedSourceResponseSchema, status_code=status.HTTP_201_CREATED)
def create_source(data: TrustedSourceUpsertSchema, service: TrustedSourceService = Depends(get_trusted_source_service)):
    return service.create(TrustedSource(id=uuid4(), **data.model_dump(mode="json")))


@router.get("", response_model=list[TrustedSourceResponseSchema])
def list_sources(active_only: bool = Query(default=False), service: TrustedSourceService = Depends(get_trusted_source_service)):
    return service.get_all(active_only=active_only)


@router.put("/{source_id}", response_model=TrustedSourceResponseSchema)
def update_source(source_id: UUID, data: TrustedSourceUpsertSchema, service: TrustedSourceService = Depends(get_trusted_source_service)):
    existing = service.get_by_id(source_id)
    if existing is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trusted source not found")
    return service.update(TrustedSource(id=source_id, **data.model_dump(mode="json"), last_crawled_at=existing.last_crawled_at, created_at=existing.created_at, updated_at=existing.updated_at))
