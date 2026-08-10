FROM apache/airflow:2.10.2-python3.12

# Instalar las dependencias del backend para que los DAGs puedan importar
# desde app.* sin errores de ModuleNotFoundError.
COPY docker/airflow/requirements.txt /tmp/airflow-requirements.txt
RUN pip install --no-cache-dir -r /tmp/airflow-requirements.txt
