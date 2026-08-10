from abc import ABC, abstractmethod
from uuid import UUID

from app.domain.entities.trusted_source import TrustedSource


class ITrustedSourceRepository(ABC):
    @abstractmethod
    def create(self, source: TrustedSource) -> TrustedSource: ...

    @abstractmethod
    def get_all(self, active_only: bool = False) -> list[TrustedSource]: ...

    @abstractmethod
    def get_by_id(self, source_id: UUID) -> TrustedSource | None: ...

    @abstractmethod
    def update(self, source: TrustedSource) -> TrustedSource: ...
