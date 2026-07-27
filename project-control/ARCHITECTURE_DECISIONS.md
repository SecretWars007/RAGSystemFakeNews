# Architecture Decision Records

# ADR-001

## Clean Architecture

Decision:

Use layered architecture:

- Domain
- Application
- Infrastructure
- Presentation

Reason:

Maintain separation of concerns and scalability.

Status:

Accepted

---

# ADR-002

## PostgreSQL + pgvector

Decision:

Use PostgreSQL as transactional and vector database.

Reason:

Allows:

- Relational storage.
- Embedding storage.
- Similarity search.

Status:

Accepted

---

# ADR-003

## Repository Pattern

Decision:

Abstract database access through repository interfaces.

Reason:

Avoid coupling business logic with persistence.

Status:

Accepted

---

# ADR-004

## LangGraph RAG Workflow

Decision:

Implement AI orchestration using LangGraph.

Reason:

Provides:

- Stateful execution.
- Agent coordination.
- Extendable workflows.

Status:

Accepted

---

# ADR-005

## Gemini AI Provider

Decision:

Use Google Gemini for:

- Text generation.
- Embeddings.

Reason:

Provides unified AI capabilities.

Status:

Accepted

---

# ADR-006

## RAG REST API

Decision:

Expose RAG analysis through:

POST /rag/analyze/{news_id}

Reason:

Separate AI processing from CRUD operations.

Status:

Accepted
