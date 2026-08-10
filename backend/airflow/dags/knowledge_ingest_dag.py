from __future__ import annotations

from datetime import datetime, timedelta

from airflow import DAG
from airflow.operators.python import PythonOperator

from app.infrastructure.database.session import SessionLocal
from app.infrastructure.ingestion.worker import run_pending_sources


def _run_ingestion() -> list[dict[str, str]]:
    return run_pending_sources()


with DAG(
    dag_id="knowledge_ingestion_pipeline",
    description="Scheduled trusted-source ingestion for the RAG knowledge base",
    start_date=datetime(2024, 1, 1),
    schedule_interval="@daily",
    catchup=False,
    default_args={
        "owner": "data-team",
        "depends_on_past": False,
        "retries": 1,
        "retry_delay": timedelta(minutes=5),
    },
    tags=["rag", "knowledge", "ingestion"],
) as dag:
    ingest_knowledge = PythonOperator(
        task_id="run_pending_sources",
        python_callable=_run_ingestion,
    )

    ingest_knowledge
