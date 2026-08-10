from dataclasses import dataclass
from datetime import datetime
from uuid import UUID


@dataclass
class TrustedSource:
    id: UUID
    name: str
    base_url: str
    source_type: str
    priority: int = 100
    crawl_interval_minutes: int = 1440
    extraction_config: str | None = None
    is_active: bool = True
    last_crawled_at: datetime | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None
