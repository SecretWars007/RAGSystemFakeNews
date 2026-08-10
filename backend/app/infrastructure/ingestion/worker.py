from datetime import datetime, timezone

from app.infrastructure.database.session import SessionLocal
from app.infrastructure.ingestion.knowledge_ingestion_service import KnowledgeIngestionService
from app.infrastructure.models.refresh_request_model import RefreshRequestModel
from app.infrastructure.models.trusted_source_model import TrustedSourceModel


def run_pending_sources() -> list[dict[str, str]]:
    """Worker entry point for scheduled trusted-source ingestion."""
    session = SessionLocal()
    try:
        service = KnowledgeIngestionService(session)
        sources = session.query(TrustedSourceModel).filter(TrustedSourceModel.is_active.is_(True)).all()
        results = []
        now = datetime.now(tz=timezone.utc)
        for source in sources:
            if (
                source.last_crawled_at is not None
                and (now - source.last_crawled_at.replace(tzinfo=timezone.utc)).total_seconds()
                < source.crawl_interval_minutes * 60
            ):
                results.append({"source_id": str(source.id), "status": "skipped_not_due"})
                continue
            try:
                results.append({"source_id": str(source.id), **service.ingest_source(source)})
            except Exception as error:
                session.rollback()
                results.append({"source_id": str(source.id), "status": "failed", "error": str(error)})

        # Procesar RefreshRequests pendientes si alguna fuente produjo o ya tenía contenido.
        # Antes solo se procesaban si había documentos nuevos ("created"/"duplicate"), lo que
        # dejaba las solicitudes atascadas en "pending" cuando todas las fuentes eran "skipped".
        has_activity = any(
            item["status"] in {"created", "duplicate", "skipped_not_due"}
            for item in results
        )
        if has_activity:
            pending_requests = (
                session.query(RefreshRequestModel)
                .filter(RefreshRequestModel.status == "pending")
                .all()
            )
            for request in pending_requests:
                request.status = "processed"
                request.processed_at = now
            if pending_requests:
                session.commit()
        return results
    finally:
        session.close()
