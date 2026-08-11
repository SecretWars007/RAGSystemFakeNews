from __future__ import annotations

import urllib.request
from datetime import timedelta

from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from airflow.utils.dates import days_ago


def _run_ingestion() -> None:
    req = urllib.request.Request(
        "http://fake-news-backend:8888/knowledge/ingest",
        method="POST"
    )
    with urllib.request.urlopen(req) as response:
        if response.status != 200:
            raise Exception(f"Failed to trigger ingestion: {response.status}")
        print("Ingestion triggered successfully:", response.read().decode())


with DAG(
    dag_id="knowledge_ingestion_pipeline",
    description="Ingest knowledge and retrain ML model on the updated dataset",
    start_date=days_ago(1),
    schedule=timedelta(days=1),
    catchup=False,
    default_args={
        "owner": "data-team",
        "depends_on_past": False,
        "retries": 1,
        "retry_delay": timedelta(minutes=5),
    },
    tags=["rag", "knowledge", "ingestion", "ml", "training"],
) as dag:
    ingest_knowledge = PythonOperator(
        task_id="run_pending_sources",
        python_callable=_run_ingestion,
    )

    train_model = BashOperator(
        task_id="train_fake_news_model",
        bash_command="python /opt/airflow/scripts/train_classifier.py",
    )

    ingest_knowledge >> train_model
