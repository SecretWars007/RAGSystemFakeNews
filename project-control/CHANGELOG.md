# Changelog

All notable changes to this project will be documented in this file.

---

# Version 1.0.0

Release:

FASE 10 - RAG API Layer Completed

Date:

2026-07-27

---

# Added

## RAG API Module

Implemented REST API layer for the autonomous RAG engine.

Added:

- rag_schema.py
- rag.py router
- RAG endpoint integration

New endpoint:

POST /rag/analyze/{news_id}

---

# RAG Engine Integration

Integrated:

- FastAPI
- LangGraph workflow
- Gemini embeddings
- Gemini LLM
- PostgreSQL pgvector

Workflow:

NewsService

↓

LangGraph

↓

Embedding Agent

↓

Retriever Agent

↓

Analyzer Agent

↓

Gemini Response

---

# Updated

Backend application:

- Main FastAPI router.
- API dependency injection.
- RAG presentation layer.

Infrastructure:

- Docker backend validation.
- Runtime environment.

---

# Validation

Completed:

[x] Python compilation

[x] FastAPI startup

[x] Swagger endpoint registration

[x] Docker backend execution

[x] API routing validation

---

# Next Release

Version 1.1.0

Target:

FASE 11 - Frontend Application


# v0.12.0

## Added

- Unit Testing infrastructure.
- Integration Testing infrastructure.
- Fake repositories.
- Test fixtures.
- SQLite isolated testing database.
- Health endpoint integration tests.
- News CRUD integration tests.
- Authentication integration tests.

## Improved

- Dependency Injection validation.
- Repository Pattern validation.
- Backend quality assurance.

## Fixed

- Repository interface inconsistencies.
- Fake repository compatibility.
- Test database isolation.


## 2026-07-27

Phase 12 Completed

Achievements

- Implemented unit testing for core services.
- Added integration tests for News and Authentication modules.
- Created fake repositories for isolated testing.
- Configured pytest fixtures and isolated test database.
- Validated Clean Architecture and dependency injection through automated tests.

Technical Notes

- End-to-End RAG tests were intentionally postponed to avoid unnecessary Gemini API consumption during regular test execution.
- Real RAG validation will be executed as part of the final release process.

Project Status

Backend testing infrastructure completed successfully.

Ready to begin Phase 13 (Professional React Frontend).
