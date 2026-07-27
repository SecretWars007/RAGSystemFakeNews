# FakeNewsRAGSystem - Architecture Decisions

## Project

FakeNewsRAGSystem

Version:

1.0.0

---

# ADR-001

## Clean Architecture Adoption

Date:

2026-01-01

## Decision

The backend architecture will follow Clean Architecture principles.

Layers:

- Domain
- Application
- Infrastructure
- Presentation

## Reason

Allows:

- Separation of business logic.
- Independent infrastructure.
- Easier testing.
- Maintainability.

---

# ADR-002

## Repository Pattern

## Decision

Database access will be abstracted using repository interfaces.

Implementation:

Domain:

- Interfaces

Infrastructure:

- PostgreSQL implementations

## Reason

Avoid coupling business logic with SQLAlchemy.

---

# ADR-003

## PostgreSQL + pgvector

## Decision

PostgreSQL will be used as the main database with pgvector extension.

## Reason

Provides:

- Relational storage.
- Vector similarity search.
- Single database architecture.

---

# ADR-004

## Gemini as AI Provider

## Decision

Google Gemini will provide:

- Text embeddings.
- Large Language Model analysis.

## Reason

Provides integrated AI capabilities for RAG.

---

# ADR-005

## LangGraph Agent Workflow

## Decision

The RAG engine will use LangGraph for orchestration.

Workflow:

News Input

↓

Embedding Agent

↓

Storage Agent

↓

Retriever Agent

↓

Analyzer Agent

↓

Response

## Reason

Allows autonomous multi-step AI workflows.

---

# ADR-006

## Docker First Development

## Decision

All main services must run using Docker.

Services:

- PostgreSQL
- pgAdmin
- Backend
- Frontend

## Reason

Guarantees environment consistency.

---

# ADR-007

## JWT Authentication

## Decision

Authentication uses JWT tokens.

Security:

- bcrypt password hashing.
- Token validation.
- Protected endpoints.

## Reason

Standard authentication approach for REST APIs.

---

# ADR-008

## React Feature Based Architecture

## Decision

Frontend modules are organized by business feature.

Structure:

features/

auth/

news/

rag/

dashboard/

## Reason

Improves scalability and maintainability.

---

# ADR-009

## Zustand State Management

## Decision

Frontend authentication state uses Zustand.

Managed:

- JWT token.
- Login state.
- Logout.

## Reason

Lightweight state management.

---

# ADR-010

## Frontend Docker Container

## Decision

React frontend runs inside Docker Compose.

## Reason

Keeps frontend and backend environments consistent.

---

# ADR-011

## RAG Frontend Integration

## Decision

Frontend consumes RAG analysis through REST API.

Flow:

React

↓

FastAPI

↓

LangGraph

↓

Gemini

↓

Result

## Reason

Separates AI execution from presentation.

---

# Current Architecture

## Backend

- FastAPI
- Clean Architecture
- SQLAlchemy
- PostgreSQL
- pgvector

## AI Layer

- LangChain
- LangGraph
- Gemini

## Frontend

- React
- TypeScript
- Axios
- Zustand

## Infrastructure

- Docker Compose
