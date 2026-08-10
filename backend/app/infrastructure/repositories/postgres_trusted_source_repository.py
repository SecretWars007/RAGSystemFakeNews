from uuid import UUID

from app.domain.entities.trusted_source import TrustedSource
from app.domain.repositories.trusted_source_repository import ITrustedSourceRepository
from app.infrastructure.models.trusted_source_model import TrustedSourceModel
from sqlalchemy.orm import Session


class PostgresTrustedSourceRepository(ITrustedSourceRepository):
    def __init__(self, session: Session):
        self.session = session

    @staticmethod
    def _to_entity(model: TrustedSourceModel) -> TrustedSource:
        return TrustedSource(
            id=model.id, name=model.name, base_url=model.base_url,
            source_type=model.source_type, priority=model.priority,
            crawl_interval_minutes=model.crawl_interval_minutes,
            extraction_config=model.extraction_config, is_active=model.is_active,
            last_crawled_at=model.last_crawled_at, created_at=model.created_at,
            updated_at=model.updated_at,
        )

    def create(self, source: TrustedSource) -> TrustedSource:
        model = TrustedSourceModel(
            id=source.id, name=source.name, base_url=source.base_url,
            source_type=source.source_type, priority=source.priority,
            crawl_interval_minutes=source.crawl_interval_minutes,
            extraction_config=source.extraction_config, is_active=source.is_active,
        )
        self.session.add(model)
        self.session.commit()
        self.session.refresh(model)
        return self._to_entity(model)

    def get_all(self, active_only: bool = False) -> list[TrustedSource]:
        query = self.session.query(TrustedSourceModel)
        if active_only:
            query = query.filter(TrustedSourceModel.is_active.is_(True))
        return [self._to_entity(item) for item in query.order_by(TrustedSourceModel.priority).all()]

    def get_by_id(self, source_id: UUID) -> TrustedSource | None:
        model = self.session.query(TrustedSourceModel).filter(TrustedSourceModel.id == source_id).first()
        return self._to_entity(model) if model else None

    def update(self, source: TrustedSource) -> TrustedSource:
        model = self.session.query(TrustedSourceModel).filter(TrustedSourceModel.id == source.id).first()
        if model is None:
            raise ValueError("Trusted source not found")
        for field in ("name", "base_url", "source_type", "priority", "crawl_interval_minutes", "extraction_config", "is_active"):
            setattr(model, field, getattr(source, field))
        self.session.commit()
        self.session.refresh(model)
        return self._to_entity(model)
