
# Architecture Decisions Record

# ADR-001

## Clean Architecture

Decision:

Use Clean Architecture with separation:

- Domain
- Application
- Infrastructure
- Presentation

Reason:

Maintain scalability and low coupling.

Status:

Accepted

---

# ADR-002

## PostgreSQL + pgvector

Decision:

Use PostgreSQL as relational database and vector storage.

Reason:

Allows:

- Structured data.
- Semantic search.
- Single persistence layer.

Status:

Accepted

---

# ADR-003

## Repository Pattern

Decision:

Repositories abstract database access.

Reason:

Avoid infrastructure dependency inside business logic.

Status:

Accepted

---

# ADR-004

## Gemini as AI Provider

Decision:

Use Google Gemini for:

- Embeddings.
- LLM reasoning.

Reason:

Integration with Google AI ecosystem.

Status:

Accepted

---

# ADR-005

## LangGraph Agent Workflow

Decision:

Use LangGraph for RAG orchestration.

Reason:

Allows:

- Stateful workflows.
- Multi-agent architecture.
- Future autonomous behavior.

Status:

Accepted

---

# ADR-006

## Docker First Development

Decision:

All services must run inside Docker.

Services:

- Backend
- PostgreSQL
- pgAdmin

Reason:

Environment consistency.

Status:

Accepted
