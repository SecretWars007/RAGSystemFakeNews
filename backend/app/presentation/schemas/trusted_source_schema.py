from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field, HttpUrl


class TrustedSourceUpsertSchema(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    base_url: HttpUrl
    source_type: str = Field(min_length=2, max_length=40)
    priority: int = Field(default=100, ge=1, le=1000)
    crawl_interval_minutes: int = Field(default=1440, ge=15, le=10080)
    extraction_config: str | None = None
    is_active: bool = True


class TrustedSourceResponseSchema(TrustedSourceUpsertSchema):
    id: UUID
    last_crawled_at: datetime | None = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
