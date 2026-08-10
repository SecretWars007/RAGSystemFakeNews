
# FakeNewsRAGSystem

Sistema para análisis de noticias falsas y verificación de contenido usando Retrieval-Augmented Generation (RAG), embeddings vectoriales y modelos generativos. El proyecto combina una API REST en FastAPI, una base de datos PostgreSQL con pgvector, agentes LangGraph para orquestación del flujo de análisis y una interfaz web en React para interactuar con el sistema.

## Estado actual

- Versión del backend: 1.0.0
- Fase de desarrollo: Testing y calidad completados, con avance hacia frontend profesional
- Estado funcional: MVP operativo con autenticación, gestión de noticias, RAG, fuentes confiables, feedback, ML y monitoreo de conocimiento

## Visión general

FakeNewsRAGSystem fue diseñado para evaluar noticias mediante comparación semántica con contenido previamente indexado y análisis contextual con modelos de lenguaje. La idea principal no es solo clasificar una noticia como verdadera o falsa de forma aislada, sino contextualizarla con noticias similares, fuentes confiables y evidencia recuperada antes de producir una conclusión.

El sistema integra:

- autenticación y autorización basada en JWT,
- gestión de noticias con CRUD completo,
- análisis semántico con embeddings,
- recuperación vectorial sobre PostgreSQL + pgvector,
- flujo de RAG orquestado con LangGraph,
- análisis de claim libre y noticias individuales,
- endpoints de ML y conocimiento,
- feedback del usuario y administración de fuentes confiables.

## Arquitectura

```mermaid
flowchart LR
    A[Usuario] --> B[Frontend React + Vite]
    B --> C[FastAPI]
    C --> D[Servicios de aplicación]
    D --> E[PostgreSQL + pgvector]
    C --> F[LangGraph / RAG Engine]
    F --> G[Gemini Embeddings]
    F --> H[Gemini LLM]
    E --> I[Noticias, embeddings, fuentes y refresh]
    H --> J[Resultado con score, label y evidencia]
    J --> B
```

### Capas principales

- Dominio: entidades, contratos de repositorio y lógica de negocio central.
- Aplicación: servicios, casos de uso y dependencias.
- Infraestructura: modelos SQLAlchemy, pgvector, agentes LLM, acceso a datos y proveedores externos.
- Presentación: routers FastAPI y frontend React.

## Funcionalidades implementadas

### Autenticación

- Registro de usuarios con contraseña segura.
- Inicio de sesión con JWT.
- Endpoint /users/me para consultar el usuario autenticado.
- Seguridad mediante dependencias y validación del token.

### Gestión de noticias

- Crear noticias.
- Listar todas las noticias.
- Consultar una noticia por ID.
- Actualizar una noticia.
- Eliminar una noticia.

### Análisis RAG

- Análisis de una noticia por ID.
- Análisis de un texto libre como claim o afirmación.
- Recuperación de noticias similares mediante similitud vectorial.
- Generación de resultado estructurado con:
  - status
  - analysis
  - score
  - label
  - reason
  - evidence
  - similar_news

### Fuentes confiables

- Registro y listado de fuentes confiables.
- Actualización de fuentes existentes.
- Soporte para filtrar solo fuentes activas.

### Knowledge / refresh

- Estado del índice de conocimiento.
- Conteo de documentos, embeddings y refrescos pendientes.
- Registro de consultas no verificadas para cola de actualización.

### Feedback

- Captura de feedback del usuario sobre análisis o experiencia.

### MLOps

- Endpoint para iniciar entrenamiento de modelo cuando está habilitado.
- Validación de configuración antes de disparar el entrenamiento.

## Stack tecnológico

### Backend

- Python 3.12
- FastAPI
- SQLAlchemy
- PostgreSQL
- pgvector
- Alembic
- LangChain
- LangGraph
- Google Gemini
- Pydantic / Pydantic Settings
- JWT / bcrypt / passlib
- pytest

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Axios
- Zustand
- Tailwind CSS

### Infraestructura

- Docker
- Docker Compose
- pgAdmin
- Nginx

## Estructura del repositorio

```text
RAGSystemFakeNews/
├── backend/
│   ├── app/
│   │   ├── application/
│   │   ├── core/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   ├── presentation/
│   │   └── main.py
│   ├── migrations/
│   ├── tests/
│   ├── requirements.txt
│   └── pytest.ini
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
├── database/
│   └── init.sql
├── docker/
│   ├── backend/
│   ├── frontend/
│   └── docker-compose.yml
├── nginx/
├── project-control/
│   ├── ARCHITECTURE_DECISIONS.md
│   ├── CHANGELOG.md
│   ├── DEVELOPMENT_LOG.md
│   ├── PROJECT_STATUS.md
│   ├── ROADMAP.md
│   ├── TASKS.md
│   └── VERSION.md
├── README.md
├── estructura.txt
└── .env.example (si aplica en tu entorno local)
```

## Variables de entorno

Crea un archivo .env en la raíz del proyecto con valores compatibles con tu entorno local y con Docker:

```env
GOOGLE_API_KEY=tu_clave_de_gemini
DATABASE_URL=postgresql+psycopg://postgres:postgres@postgres:5432/fake_news_db
```

## Inicio rápido con Docker

### 1. Clonar y entrar al proyecto

```bash
git clone <url-del-repositorio>
cd RAGSystemFakeNews
```

### 2. Levantar servicios

```bash
docker compose -f docker/docker-compose.yml up --build
```

### 3. Verificar servicios

```bash
docker compose -f docker/docker-compose.yml ps
```

### 4. Acceder a la aplicación

- Frontend: http://localhost:3000
- Backend: http://localhost:8888
- pgAdmin: http://localhost:5050
- PostgreSQL: localhost:4588

## Ejecutar localmente sin Docker

### Backend

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux/macOS
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8888
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Endpoints principales

### Usuarios

- GET /users/health
- POST /users/register
- POST /users/login
- GET /users/me

### Noticias

- POST /news
- GET /news
- GET /news/{news_id}
- PUT /news/{news_id}
- DELETE /news/{news_id}

### RAG

- POST /rag/analyze
- POST /rag/analyze/{news_id}

### Fuentes confiables

- POST /sources
- GET /sources
- PUT /sources/{source_id}

### Knowledge

- GET /knowledge/status

### Feedback

- POST /feedback

### MLOps

- POST /ml/train

## Ejemplo de uso

### Registrar usuario

```bash
curl -X POST http://localhost:8888/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'
```

### Iniciar sesión

```bash
curl -X POST http://localhost:8888/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'
```

### Crear noticia

```bash
curl -X POST http://localhost:8888/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Ejemplo de noticia",
    "content": "Texto de la noticia a analizar",
    "source": "CNN",
    "author": "Ana",
    "url": "https://example.com/noticia",
    "language": "es",
    "country": "MX",
    "published_at": "2026-08-09T12:00:00Z",
    "is_fake": false
  }'
```

### Analizar una noticia

```bash
curl -X POST http://localhost:8888/rag/analyze/<news_id> \
  -H "Authorization: Bearer <token>"
```

### Consultar estado de conocimiento

```bash
curl http://localhost:8888/knowledge/status
```

## Estado del proyecto

El proyecto se encuentra en una etapa funcional de prototipo/ MVP con un backend estable y un frontend en progreso. La base de la solución ya está implementada y validada a nivel de arquitectura, API y pruebas unitarias/integración.

### Logros relevantes

- Arquitectura modular orientada a capas.
- API REST con enrutadores dedicados.
- RAG funcionando con LangGraph y pgvector.
- Gestión de usuarios y seguridad con JWT.
- Base de datos vectorial con PostgreSQL + pgvector.
- Soporte de despliegue con Docker Compose.
- Infraestructura de pruebas para backend.

### Mejoras futuras

- frontend profesional y experiencia de usuario más completa,
- dashboard de análisis y métricas,
- mejora de explicabilidad de resultados,
- integración de más fuentes de datos,
- mayor automatización de ingesta de noticias,
- soporte avanzado de roles y permisos.

## Conclusión

FakeNewsRAGSystem es una propuesta sólida para la verificación automatizada de noticias mediante IA, recuperación semántica y análisis contextual. Su valor reside en combinar un enfoque técnico de arquitectura limpia con una aplicación práctica para detectar contenido engañoso y apoyar la verificación de información.

### 10.1 Requisitos previos

Antes de levantar el proyecto, asegúrate de tener instalado:

- Docker Desktop
- Docker Compose
- Git
- Una clave de API válida de Google Gemini

### 10.2 Clonar el proyecto

Ejecuta los siguientes comandos desde una terminal:

```bash
git clone <url-del-repositorio>
cd RAGSystemFakeNews
```

Si ya tienes el repositorio descargado, entra a la carpeta principal:

```bash
cd RAGSystemFakeNews
```

### 10.3 Preparación del entorno

Crea un archivo .env en la raíz del proyecto con contenido similar a:

```env
GOOGLE_API_KEY=tu_clave_de_gemini
DATABASE_URL=postgresql+psycopg://postgres:postgres@postgres:5432/fake_news_db
```

> Si vas a ejecutar el backend fuera de Docker, ajusta el host de la base de datos según tu entorno local.

### 10.4 Levantar el proyecto desde cero con Docker

#### Paso 1: construir y levantar los servicios

```bash
docker compose -f docker/docker-compose.yml up --build
```

Este comando realizará lo siguiente:

- descargará las imágenes necesarias,
- construirá la imagen del backend y del frontend,
- creará la red interna del proyecto,
- levantará PostgreSQL, pgAdmin, la API y la interfaz web.

#### Paso 2: verificar que los contenedores estén activos

```bash
docker compose -f docker/docker-compose.yml ps
```

Deberías ver los servicios activos de:

- postgres
- pgadmin
- backend
- frontend

#### Paso 3: acceder a la aplicación

Una vez que los contenedores estén corriendo, puedes abrir:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8888
- pgAdmin: http://localhost:5050
- Base de datos PostgreSQL: localhost:4588

### 10.5 Inicialización de la base de datos

El archivo de inicialización en la carpeta database crea la extensión vector y pgcrypto. Si la base de datos se levanta correctamente, el sistema quedará listo para almacenar embeddings y noticias.

### 10.6 Detener y limpiar los servicios

Para detener los contenedores:

```bash
docker compose -f docker/docker-compose.yml down
```

Si además deseas eliminar los volúmenes de datos:

```bash
docker compose -f docker/docker-compose.yml down -v
```

### 10.7 Ejecutar el backend manualmente (opcional)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8888
```

### 10.6 Ejecutar el frontend manualmente (opcional)

```bash
cd frontend
npm install
npm run dev
```

## 11. Endpoints principales

### Autenticación

- POST /users/register
- POST /users/login
- GET /users/me

### Noticias

- POST /news
- GET /news
- GET /news/{news_id}
- PUT /news/{news_id}
- DELETE /news/{news_id}

### RAG

- POST /rag/analyze/{news_id}

## 12. Ejemplo de uso del flujo RAG

1. Crear un usuario y autenticarlo.
2. Crear una noticia mediante el endpoint de noticias.
3. Ejecutar el análisis RAG para esa noticia.
4. Revisar la respuesta generada por el sistema.
5. Consultar el resultado en la interfaz web del frontend.

## 13. Metodología propuesta

El desarrollo del proyecto se enmarca en una metodología orientada a la construcción incremental de un prototipo funcional. La estrategia contempla tres fases principales:

1. modelado del problema y definición de la arquitectura,
2. implementación de los componentes de almacenamiento, recuperación y generación,
3. validación del flujo mediante pruebas de integración y evaluación de la experiencia del usuario.

Esta aproximación permite avanzar de forma ordenada desde una solución conceptual hasta una implementación operativa.

## 14. Comparativa técnica de decisiones de diseño

| Componente | Decisión adoptada | Justificación |
|---|---|---|
| Backend | FastAPI | API rápida, moderna y compatible con arquitecturas limpias |
| Base de datos | PostgreSQL + pgvector | Permite almacenamiento relacional y búsqueda semántica |
| Recuperación | Búsqueda vectorial | Facilita la comparación semántica entre noticias |
| Orquestación | LangGraph | Permite modelar el flujo como un grafo de agentes |
| Generación de texto | Gemini LLM | Integra razonamiento contextual con buena capacidad generativa |
| Frontend | React + Vite | Desarrollo ágil y experiencia moderna de interfaz |
| Contenedores | Docker Compose | Garantiza reproducibilidad y despliegue consistente |

## 15. Contribución académica y valor del proyecto

FakeNewsRAGSystem aporta una propuesta práctica para abordar el problema de la desinformación mediante inteligencia artificial. Su importancia radica en que combina métodos de recuperación de información y generación de lenguaje para construir una solución más interpretativa que una simple clasificación binaria.

El proyecto puede servir como base para:

- trabajos de investigación en sistemas RAG,
- estudios sobre análisis automatizado de noticias falsas,
- desarrollo de prototipos para plataformas de verificación informativa,
- y exploración de arquitecturas híbridas entre bases de datos relacionales y modelos generativos.

## 16. Ejemplos de preguntas que el agente puede responder

El agente puede responder preguntas orientadas a la evaluación de una noticia, por ejemplo:

- ¿Esta noticia es falsa o real?
- ¿Qué evidencia respalda esta clasificación?
- ¿Qué señales de manipulación o sesgo se observan?
- ¿Qué noticias similares fueron usadas como contexto?
- ¿Cuál es el nivel de confianza del análisis?
- ¿Por qué esta noticia parece estar relacionada con otras publicaciones sospechosas?

## 17. Ejemplos de respuestas generadas por el agente

A continuación se muestran ejemplos representativos del tipo de salida que el sistema puede producir:

```text
Pregunta: ¿Esta noticia es falsa o real?
Respuesta: FAKE
Score: 0.93
Razón: La noticia presenta inconsistencias con fuentes verificables y coincide con patrones de contenido manipulador detectados en noticias similares.
```

```text
Pregunta: ¿Qué evidencia respalda esta clasificación?
Respuesta: Se encontraron coincidencias semánticas con artículos previos que compartían frases clave, contexto engañoso y ausencia de respaldo documental sólido.
```

```text
Pregunta: ¿Cuál es el nivel de confianza del análisis?
Respuesta: Alto, con un puntaje de 0.91, porque el sistema comparó la noticia con múltiples fuentes contextuales similares.
```

## 19. Estado actual del proyecto

El proyecto se encuentra en una fase de desarrollo funcional con un MVP orientado a demostrar la viabilidad de un sistema RAG para análisis de noticias falsas. Se puede usar como base para investigación, extensión académica y desarrollo posterior.

## 20. Posibles mejoras futuras

- agregar modelos adicionales de embeddings,
- incorporar evaluación de explicabilidad,
- mejorar la calidad del prompt y del pipeline,
- añadir soporte para recolección automática de noticias,
- implementar dashboards de analítica y métricas,
- y extender la autenticación con roles y permisos más robustos.

## 21. Conclusión

FakeNewsRAGSystem representa una propuesta integral para combinar recuperación de información, embeddings vectoriales y modelos generativos en un sistema orientado a la verificación de contenido noticioso. Su valor no solo está en la implementación técnica, sino también en la posibilidad de servir como base para proyectos de investigación, desarrollo e innovación en el área de inteligencia artificial aplicada a la desinformación.
