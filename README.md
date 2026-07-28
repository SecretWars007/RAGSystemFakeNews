
# FakeNewsRAGSystem

Sistema RAG para detección y análisis inteligente de noticias falsas, desarrollado como una propuesta de arquitectura orientada a inteligencia artificial aplicada al análisis de contenido noticioso. El proyecto combina técnicas de procesamiento de lenguaje natural, embeddings vectoriales, recuperación de información y agentes de orchestration para construir un flujo de análisis semántico sobre noticias reales y potencialmente engañosas.

## 1. Visión general

Este proyecto fue concebido como una solución de referencia para la integración de Retrieval-Augmented Generation (RAG) con un motor de análisis de noticias falsas. Su propósito es demostrar cómo una arquitectura modular, basada en servicios, puede combinar:

- almacenamiento estructural de noticias,
- generación de embeddings semánticos,
- búsqueda vectorial sobre un almacén PostgreSQL con pgvector,
- análisis contextual mediante un modelo de lenguaje,
- y una interfaz web para interactuar con los resultados.

La idea central es que el sistema no se limita a clasificar una noticia de forma aislada, sino que compara su contenido con otras noticias similares previamente almacenadas, enriqueciendo la decisión con contexto semántico relevante.

## 2. Objetivo del proyecto

El objetivo principal es construir un prototipo funcional de un sistema de análisis de veracidad noticiosa que:

1. permita registrar noticias en una base de datos,
2. convierta el contenido textual en representaciones vectoriales,
3. recupere noticias similares mediante búsqueda semántica,
4. use un modelo de lenguaje para generar una evaluación contextualizada,
5. y entregue una salida comprensible para el usuario final.

Este tipo de solución tiene aplicaciones relevantes en:

- investigación en inteligencia artificial,
- análisis de desinformación,
- sistemas de apoyo a la verificación de información,
- y desarrollo de arquitecturas RAG para dominios especializados.

## 3. Casos de uso principales

- Registrar noticias con metadata como fuente, autor, idioma, país y fecha de publicación.
- Analizar una noticia individual utilizando contexto recuperado de otras noticias.
- Generar embeddings automáticamente para cada noticia procesada.
- Almacenar los embeddings en PostgreSQL con soporte vectorial.
- Consultar el resultado del análisis a través de una interfaz web.
- Gestionar autenticación de usuarios para acceso controlado al sistema.

## 4. Características principales

### 4.1 Gestión de usuarios

- Registro de usuarios.
- Inicio de sesión con autenticación JWT.
- Endpoints protegidos para operaciones sensibles.
- Hashing seguro de contraseñas mediante bcrypt.

### 4.2 Gestión de noticias

- Creación, consulta, actualización y eliminación de noticias.
- Almacenamiento estructural con UUID, fecha de publicación y etiquetas de veracidad.
- API REST para integraciones externas y consumo del frontend.

### 4.3 Motor RAG para análisis de noticias

- Generación de embeddings del contenido de una noticia.
- Recuperación de noticias similares usando búsqueda vectorial.
- Uso de un modelo de lenguaje para analizar la noticia con contexto.
- Producción de un resultado estructurado con etiqueta, puntaje y explicación.

### 4.4 Orquestación de agentes

- El flujo RAG está implementado con LangGraph.
- Cada etapa del proceso se encapsula como un nodo del grafo.
- El sistema mantiene un estado compartido entre los agentes para garantizar el flujo de información.

## 5. Arquitectura del proyecto

El proyecto sigue una arquitectura modular inspirada en Clean Architecture, separando claramente las responsabilidades entre capas de dominio, aplicación, infraestructura y presentación.

### 5.1 Arquitectura general

```mermaid
flowchart LR
    A[Usuario] --> B[Frontend React/Vite]
    B --> C[API REST FastAPI]
    C --> D[Servicios de Aplicación]
    D --> E[Repositorios]
    E --> F[PostgreSQL + pgvector]
    C --> G[Motor RAG / LangGraph]
    G --> H[Gemini Embeddings]
    G --> I[Gemini LLM]
    H --> F
    I --> J[Resultado de análisis]
    J --> B
```

### 5.2 Capas de la solución

- Capa de dominio
  - Define entidades como noticia, usuario y embedding.
  - Establece contratos de repositorio para mantener la lógica de negocio independiente de la infraestructura.

- Capa de aplicación
  - Contiene los servicios de negocio.
  - Implementa casos de uso como autenticación, gestión de noticias y lógica de embeddings.

- Capa de infraestructura
  - Integra PostgreSQL, SQLAlchemy, pgvector, agentes LangGraph y clientes de IA.
  - Maneja la persistencia, el acceso a modelos externos y la orquestación del flujo RAG.

- Capa de presentación
  - Expone la API REST en FastAPI.
  - Entrega una interfaz web en React para consumo humano.

## 6. Arquitectura ML y flujo RAG

La parte más importante del proyecto es el flujo de análisis basado en RAG.

### 6.1 Diseño conceptual

El sistema no trabaja con una sola noticia aislada. En cambio:

1. recibe una noticia de entrada,
2. genera un vector semántico representando su contenido,
3. recupera noticias similares almacenadas previamente,
4. construye un contexto enriquecido,
5. y solicita al modelo de lenguaje una evaluación fundamentada en ese contexto.

### 6.2 Pipeline de procesamiento

```mermaid
flowchart TD
    A[Entrada: noticia] --> B[Preparación del texto]
    B --> C[Generación de embedding]
    C --> D[Búsqueda vectorial en pgvector]
    D --> E[Construcción de contexto]
    E --> F[Análisis con Gemini LLM]
    F --> G[Respuesta: label + score + reason + evidence]
    F --> H[Persistencia del embedding]
```

### 6.3 Componentes del flujo RAG

- Nodo de análisis inicial
  - Prepara el texto de entrada para el siguiente paso.

- Nodo de embedding
  - Convierte el contenido en un vector semántico utilizando un modelo de embeddings de Gemini.

- Nodo de recuperación
  - Busca noticias similares mediante similitud vectorial en PostgreSQL con pgvector.

- Nodo de análisis
  - Utiliza el contexto recuperado para solicitar una evaluación al modelo de lenguaje.

- Nodo de persistencia
  - Guarda el embedding generado para futuras búsquedas.

### 6.4 Justificación técnica

La elección de un diseño RAG aporta varias ventajas:

- mejora la calidad del análisis contextual,
- permite trabajar con información previa sin reentrenar el modelo,
- hace que la respuesta sea más interpretable,
- y facilita la escalabilidad del sistema a nuevos dominios o colecciones de datos.

## 7. Tecnologías utilizadas

### Backend

- Python 3.12
- FastAPI
- SQLAlchemy
- PostgreSQL
- pgvector
- Alembic
- LangGraph
- LangChain
- Google Gemini
- Pydantic
- JWT / bcrypt

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Zustand
- Axios
- Tailwind CSS

### Infraestructura

- Docker
- Docker Compose
- pgAdmin
- Nginx

## 8. Estructura del repositorio

```text
backend/              # API y lógica de negocio
  app/                 # módulos principales del backend
    application/       # servicios y casos de uso
    core/              # configuración y seguridad
    domain/            # entidades y contratos de repositorio
    infrastructure/    # integraciones, agentes, base de datos e IA
    presentation/     # rutas, schemas y controllers
frontend/             # aplicación React para la interfaz web
docker/               # configuración de contenedores
database/             # scripts iniciales de base de datos
project-control/      # documentación de proyecto, roadmap y decisiones técnicas
```

## 9. Funcionalidades del sistema en detalle

### 9.1 Autenticación y seguridad

El sistema implementa un flujo básico de autenticación con JWT. El usuario puede registrarse e iniciar sesión, obteniendo un token que permite acceder a rutas protegidas. La arquitectura separa el manejo de credenciales del resto de la lógica de negocio, facilitando futuras ampliaciones como roles, permisos y auditoría.

### 9.2 Gestión de noticias

La API permite crear noticias con información textual y metadata relevante. Estas noticias se almacenan en PostgreSQL y están disponibles para el análisis posterior. El módulo de noticias es la base sobre la cual se construye el flujo RAG.

### 9.3 Análisis RAG de una noticia

Cuando el usuario solicita analizar una noticia, el sistema:

1. recupera la noticia por ID,
2. inicia un flujo de LangGraph,
3. genera un embedding del texto,
4. localiza noticias similares en el almacen vectorial,
5. construye un contexto con dichas noticias,
6. consulta a Gemini para producir una evaluación,
7. y devuelve un resultado con score, explicación y evidencias.

### 9.4 Almacenamiento vectorial

El proyecto utiliza PostgreSQL con la extensión pgvector para almacenar embeddings. Esto permite realizar búsquedas semánticas de forma eficiente, algo fundamental para un sistema RAG.

### 9.5 Interfaz de usuario

El frontend ofrece páginas para:

- iniciar sesión,
- registrarse,
- listar y crear noticias,
- ejecutar análisis RAG,
- y navegar por el flujo del sistema de forma visual.

## 10. Flujo de ejecución del sistema

### 10.1 Requisitos previos

Antes de levantar el proyecto, asegúrate de tener instalado:

- Docker Desktop
- Docker Compose
- Git
- Una clave de API válida de Google Gemini

### 10.2 Preparación del entorno

Crea un archivo .env en la raíz del proyecto con contenido similar a:

```env
GOOGLE_API_KEY=tu_clave_de_gemini
DATABASE_URL=postgresql+psycopg://postgres:postgres@postgres:5432/fake_news_db
```

> Si vas a ejecutar el backend fuera de Docker, ajusta el host de la base de datos según tu entorno local.

### 10.3 Levantar el proyecto desde cero

#### Opción A: con Docker Compose (recomendada)

```bash
docker compose -f docker/docker-compose.yml up --build
```

Esto levantará:

- PostgreSQL en el puerto 4588
- pgAdmin en el puerto 5050
- Backend en el puerto 8888
- Frontend en el puerto 3000

#### Servicios disponibles

- Frontend: http://localhost:3000
- Backend API: http://localhost:8888
- pgAdmin: http://localhost:5050
- Base de datos PostgreSQL: localhost:4588

### 10.4 Inicialización de la base de datos

El archivo de inicialización en la carpeta database crea la extensión vector y pgcrypto. Si la base de datos se levanta correctamente, el sistema quedará listo para almacenar embeddings y noticias.

### 10.5 Ejecutar el backend manualmente (opcional)

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

## 16. Estado actual del proyecto

El proyecto se encuentra en una fase de desarrollo funcional con un MVP orientado a demostrar la viabilidad de un sistema RAG para análisis de noticias falsas. Se puede usar como base para investigación, extensión académica y desarrollo posterior.

## 17. Posibles mejoras futuras

- agregar modelos adicionales de embeddings,
- incorporar evaluación de explicabilidad,
- mejorar la calidad del prompt y del pipeline,
- añadir soporte para recolección automática de noticias,
- implementar dashboards de analítica y métricas,
- y extender la autenticación con roles y permisos más robustos.

## 18. Conclusión

FakeNewsRAGSystem representa una propuesta integral para combinar recuperación de información, embeddings vectoriales y modelos generativos en un sistema orientado a la verificación de contenido noticioso. Su valor no solo está en la implementación técnica, sino también en la posibilidad de servir como base para proyectos de investigación, desarrollo e innovación en el área de inteligencia artificial aplicada a la desinformación.
