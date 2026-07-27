# Changelog

## v0.1.0

### FASE 1

Creación inicial del proyecto:

- estructura de carpetas
- configuración Git
- documentación base
- sistema de control del proyecto

## v0.1.0

## FASE 2 COMPLETADA

Implementada infraestructura Docker:

- PostgreSQL 16
- pgvector
- pgcrypto
- PgAdmin
- Volumen persistente
- Red Docker interna

## FASE 3 COMPLETADA

Implementado:

- Backend FastAPI
- Dockerfile backend
- Servicio backend en docker-compose
- Configuración inicial Clean Architecture
- Endpoint health check


## FASE 4 COMPLETA

## FASE 5 COMPLETADA

Fecha:
2026-07-26

Cambios realizados:

* Integración de Alembic para gestión de migraciones.
* Configuración de migraciones con PostgreSQL.
* Integración SQLAlchemy 2.0.
* Creación de modelos persistentes iniciales.
* Configuración de pgvector para embeddings.
* Creación de estructura de almacenamiento para historial de consultas.
* Creación de estructura para respuestas RAG detalladas.

Tablas agregadas:

* users
* news
* embeddings
* query_history
* rag_responses
* audit_logs

Correcciones:

* Ajuste de Alembic env.py para utilizar DATABASE_URL desde Settings.
* Corrección de migración Vector PostgreSQL.
* Configuración correcta del tipo Vector(1536).

Estado:

FASE 5 FINALIZADA


## FASE 6 - Clean Architecture

Implementado:

- Separación Domain/Application/Infrastructure.
- Creación de entidades de dominio.
- Creación de interfaces Repository.
- Implementación PostgreSQL Repository.
- Implementación Dependency Injection.
- Creación de Use Cases.
- Agregación de pruebas unitarias.

Principios aplicados:

- SOLID
- Repository Pattern
- Dependency Inversion Principle



## FASE 7

- Implementado módulo de autenticación.
- Registro de usuarios.
- Login con JWT.
- Hash de contraseñas con bcrypt.
- Integración con PostgreSQL.
- Corrección de compatibilidad passlib/bcrypt.


## FASE 8 - News CRUD

Fecha: 2026-07-27

Cambios:

+ Creación del módulo completo de noticias.
+ Implementación Repository Pattern.
+ Implementación Service Layer.
+ Implementación API REST.
+ Integración con FastAPI Dependency Injection.
+ Preparación del modelo para futuras capas RAG.
+ Corrección de dependencias entre módulos.
