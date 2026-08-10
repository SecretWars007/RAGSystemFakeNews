from pathlib import Path


def test_knowledge_ingestion_dag_exists():
    dag_file = (
        Path(__file__).resolve().parents[1]
        / "airflow"
        / "dags"
        / "knowledge_ingest_dag.py"
    )
    assert dag_file.exists(), (
        "La DAG de Airflow para ingestión de conocimiento no existe"
    )

    content = dag_file.read_text(encoding="utf-8")
    assert "knowledge_ingestion_pipeline" in content
    assert "run_pending_sources" in content
