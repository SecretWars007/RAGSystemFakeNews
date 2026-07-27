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
