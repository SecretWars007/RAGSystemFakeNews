from uuid import UUID

from app.domain.entities.trusted_source import TrustedSource
from app.domain.repositories.trusted_source_repository import ITrustedSourceRepository


class TrustedSourceService:
    def __init__(self, repository: ITrustedSourceRepository):
        self.repository = repository

    def create(self, source: TrustedSource) -> TrustedSource:
        return self.repository.create(source)

    def get_all(self, active_only: bool = False) -> list[TrustedSource]:
        return self.repository.get_all(active_only=active_only)

    def get_by_id(self, source_id: UUID) -> TrustedSource | None:
        return self.repository.get_by_id(source_id)

    def update(self, source: TrustedSource) -> TrustedSource:
        return self.repository.update(source)
