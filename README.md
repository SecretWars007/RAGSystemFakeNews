
# FakeNewsRAGSystem

Sistema completo para la detección y verificación de noticias falsas mediante IA, recuperación semántica, embeddings vectoriales y modelos de aprendizaje supervisado. El proyecto integra una API REST con FastAPI, una base de datos PostgreSQL con pgvector, una capa de agentes y RAG basada en LangGraph, un frontend moderno en React y una automatización de ingesta con Airflow.

## Estado actual

- Backend: funcional y modular, con autenticación, noticias, fuentes, feedback, conocimiento y RAG.
- Frontend: interfaz moderna, responsive y conectada a los principales flujos del sistema.
- Base de datos: estructura vectorial lista para almacenamiento de embeddings, documentos de conocimiento y solicitudes de refresco.
- Modelo de aprendizaje: pipeline configurado para entrenamiento supervisado usando TF-IDF + Logistic Regression con MLflow.
- Airflow: DAG de ingesta programada implementada y lista para ejecutarse a través de Docker con scheduler y webserver.
- Infraestructura: stack local preparado con PostgreSQL, pgAdmin y servicios de orquestación.

## Visión general

FakeNewsRAGSystem fue concebido para analizar noticias de forma contextual, no solo clasificarlas aisladamente. El sistema combina:

- recuperación de noticias similares por similitud semántica,
- comparación con fuentes confiables,
- uso de embeddings para indexar y buscar contenido relevante,
- generación de explicaciones a partir de evidencia encontrada,
- entrenamiento y registro de modelos de clasificación para uso posterior,
- automatización de ingestas de conocimiento con Airflow.

## Arquitectura del sistema

`mermaid flowchart LR     U[Usuario] --> F[Frontend React + Vite]     F --> API[FastAPI API]     API --> APP[Servicios de aplicación]     APP --> DB[(PostgreSQL + pgvector)]     APP --> RAG[LangGraph / RAG Engine]     RAG --> EMB[Gemini Embeddings]     RAG --> LLM[Gemini LLM]     DB --> DOCS[Noticias, embeddings, fuentes, feedback]     APP --> ML[Modelo de clasificación + MLflow]     ML --> TRAIN[Dataset configurado]     APP --> DAG[Airflow DAG de ingesta]     DAG --> S[Fuentes confiables]     LLM --> RES[Resultado con score, label, evidencia y similar_news]     RES --> F `

### Capas principales

- Dominio: entidades, contratos y lógica principal del negocio.
- Aplicación: servicios, casos de uso y orquestación.
- Infraestructura: acceso a base de datos, modelos SQLAlchemy, agentes, embeddings y proveedores externos.
- Presentación: routers REST y frontend React.

## Mejoras implementadas en backend

### 1. API REST modular

El backend se organiza por módulos funcionales:

- users para autenticación y perfil del usuario.
- 

ews para CRUD de noticias.
--------------------------

ag para análisis semántico y recuperación contextual.

- sources para gestión de fuentes confiables.
- knowledge para monitoreo del estado del índice documental.
- eedback para registro de comentarios y valoración del usuario.
- ml para entrenamiento del modelo configurado.

### 2. Autenticación y seguridad

- Registro de usuarios.
- Inicio de sesión con JWT.
- Dependencias protegidas para rutas privadas.
- Lógica de autorización y validación de token.
- CORS habilitado para frontend local y entornos de desarrollo.

### 3. Gestión de noticias

- Creación, listado, detalle, actualización y eliminación de noticias.
- Soporte de metadatos como fuente, autor, URL, idioma, país y fecha de publicación.
- Integración directa con el pipeline RAG para análisis de contenido.

### 4. Motor de RAG y evidencia

El endpoint principal POST /rag/analyze analiza un claim libre sin persistirlo como noticia, mientras que POST /rag/analyze/{news_id} analiza una noticia ya registrada.

El flujo incluye:

- extracción de contexto del contenido,
- búsqueda de noticias similares,
- recuperación vectorial usando PostgreSQL + pgvector,
- evaluación con lenguaje generativo,
- respuesta estructurada con status, score, label,
  eason, evidence, decision_source y similar_news.

Si la respuesta se marca como UNVERIFIED, el sistema encola una solicitud de refresco del conocimiento para mejorar el índice.

### 5. Estado de conocimiento y refresh

El endpoint /knowledge/status devuelve:

- número de documentos indexados,
- número total de embeddings,
- solicitudes pendientes de refresco,
- fecha del último índice generado.

Esto facilita la supervisión del sistema de ingesta y del estado de la base de conocimiento.

### 6. MLOps y entrenamiento

Se añadió un servicio de entrenamiento configurado:

- validación del dataset configurado,
- entrenamiento con TF-IDF + Logistic Regression,
- medición con F1 macro,
- registro del modelo en MLflow,
- generación de una URI candidata para producción.

El endpoint protegido POST /ml/train inicia el procedimiento solo si ALLOW_MODEL_TRAINING está habilitado.

### 7. Airflow para automatización de ingesta

La automatización de conocimiento quedó definida mediante una DAG en ackend/airflow/dags/knowledge_ingest_dag.py.

El flujo realiza:

- lectura de fuentes confiables activas,
- comprobación del intervalo de crawl,
- ejecución del worker de ingesta actual,
- actualización del estado de documentos e indexación vectorial,
- tratamiento de solicitudes pendientes de refresco.

La configuración se extiende en Docker Compose con los servicios irflow-init, irflow-webserver y irflow-scheduler para permitir la ejecución programada y la observación desde la UI de Airflow.

## Mejoras implementadas en frontend

El frontend fue reforzado con una base visual moderna y un flujo de navegación coherente.

### Principales secciones

- Login y registro con experiencia visual consistente.
- Dashboard principal con resumen operativo y panel de bienvenida.
- Layout principal con sidebar, header y contenido estructurado.
- Página de fuentes confiables.
- Página de noticias y alta de contenido.
- Analizador RAG con enfoque de verificación de contenido.

### Stack del frontend

- React 19
- TypeScript
- Vite
- React Router
- Axios
- Zustand
- Tailwind CSS
- Lucide Icons

### Rutas principales

- /login
- /register
- /dashboard
- /news
- /news/create
- /sources
- /rag

## Mejoras en la base de datos y almacenamiento

La base de datos se prepara para un entorno de analítica y recuperación vectorial.

### Extensiones y soporte vectorial

`sql CREATE EXTENSION IF NOT EXISTS vector; CREATE EXTENSION IF NOT EXISTS pgcrypto; `

Esto habilita:

- almacenamiento de embeddings vectoriales,
- búsqueda por similitud semántica,
- manejo seguro de identificadores y hashes.

### Modelos clave

El sistema incluye modelos para:

- usuarios,
- noticias,
- embeddings,
- documentos de conocimiento,
- fuentes confiables,
- historial de consultas,
- feedback del usuario,
- auditoría de eventos,
- respuestas RAG,
- solicitudes de refresh.

### Migraciones y flujo de datos

Las migraciones cubren:

- modelos base iniciales,
- tabla de noticias,
- tablas de conocimiento y embeddings,
- cola de refresco del conocimiento,
- modelos de feedback,
- dimensiones de embedding y ajustes de modelos.

La infraestructura permite mantener una base de conocimiento actualizada y con trazabilidad.

## Modelo de aprendizaje y dataset

### Pipeline de entrenamiento

El servicio ModelTrainingService entrena un modelo supervisado con:

- TfidfVectorizer(ngram_range=(1, 2))
- LogisticRegression(max_iter=1000, class_weight='balanced')
- métrica 1_macro
- registro en MLflow con mlflow.sklearn.log_model

### Requisitos del dataset

Se soportan columnas obligatorias como:

- itle
- ext
- label

y opcionalmente:

- content_hash
- source
- published_at

## Ejecución rápida

### Requisitos

- Docker Desktop o Docker Engine
- Python 3.12
- PostgreSQL con pgvector

### Arranque local

`ash docker compose -f docker/docker-compose.yml up --build `

### Backend y pruebas

`ash cd backend pytest `

### Airflow

La UI de Airflow queda disponible en:

- http://localhost:8080
- usuario: dmin
- contraseña: dmin

## Estado del proyecto

La base del sistema está consolidada y lista para extensión en automatización, observabilidad y despliegue en producción.
