# Research: Backend API & Data Layer

**Feature**: 001-backend-api-data
**Date**: 2026-01-09

## Scope

This research resolves the open items in `plan.md` “Technical Context” and captures key
backend decisions for a FastAPI + SQLModel + Neon (PostgreSQL) todo backend with JWT-based
user isolation.

## Decisions

### Decision 1: Python version

- **Chosen**: Python 3.11+
- **Rationale**: Broad ecosystem support and strong async performance; compatible with
  current FastAPI ecosystem.
- **Alternatives considered**:
  - Python 3.10 (older baseline; fewer improvements)
  - Python 3.12+ (fine, but not necessary to require)

### Decision 2: FastAPI + SQLModel

- **Chosen**: FastAPI for the web API; SQLModel for ORM/models.
- **Rationale**: FastAPI provides strong request validation and OpenAPI generation;
  SQLModel integrates Pydantic-style models with SQLAlchemy ORM patterns.
- **Alternatives considered**:
  - Django REST Framework (heavier framework; different architecture)
  - Flask + SQLAlchemy (more manual schema/validation work)

### Decision 3: Storage (Neon Serverless PostgreSQL)

- **Chosen**: PostgreSQL provided by Neon (serverless managed Postgres).
- **Rationale**: Persistent relational storage with strong integrity guarantees and
  straightforward multi-user scoping via indexed `user_id`.
- **Alternatives considered**:
  - SQLite (not representative of production multi-user database patterns)
  - Document DB (unnecessary complexity for relational ownership constraints)

### Decision 4: JWT verification and identity mapping

- **Chosen**: Backend verifies incoming JWT signatures using a shared secret
  (`BETTER_AUTH_SECRET`) and derives a stable `user_id` claim from the token.
- **Rationale**: Satisfies constitution constraint: identity derived from JWT only; backend
  remains stateless and can enforce ownership consistently.
- **Alternatives considered**:
  - Backend session store (violates stateless backend requirement)
  - Calling the auth provider on each request (adds coupling and latency)

### Decision 5: Testing approach

- **Chosen**: pytest for automated tests; API client testing via HTTP requests against a
  running app instance.
- **Rationale**: Widely used Python test framework; supports integration testing of DB
  persistence and authorization.
- **Alternatives considered**:
  - No automated tests (allowed by template defaults, but reduces confidence)

### Decision 6: Project structure

- **Chosen**: Web application structure:
  - `backend/` for FastAPI application
  - `frontend/` for Next.js (out-of-scope in this feature, but structure reserved)
- **Rationale**: Matches constitution separation of concerns and Spec-Kit plan template
  option for web apps.
- **Alternatives considered**:
  - Single `src/` root (mixes concerns in a full-stack repo)

## Non-functional targets (defaults)

- **Performance goals (default)**: Suitable for interactive usage by a small group of users
  (hackathon setting) with predictable behavior under light concurrency.
- **Constraints (default)**: Backend remains stateless; all operations authenticated and
  user-scoped.
- **Scale/scope (default)**: Multi-user; each user can manage at least hundreds of tasks.

## Open Questions

None blocking planning.
