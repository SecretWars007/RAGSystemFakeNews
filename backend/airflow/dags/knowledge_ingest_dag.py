from __future__ import annotations

from datetime import timedelta

from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.utils.dates import days_ago

from app.infrastructure.ingestion.worker import run_pending_sources


def _run_ingestion() -> list[dict[str, str]]:
    return run_pending_sources()


with DAG(
    dag_id="knowledge_ingestion_pipeline",
    description="Scheduled trusted-source ingestion for the RAG knowledge base",
    # days_ago(0) evita el uso de datetime literal con timezone naive.
    start_date=days_ago(1),
    # `schedule` reemplaza el parámetro `schedule_interval` deprecado en Airflow 2.4+.
    schedule=timedelta(days=1),
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
