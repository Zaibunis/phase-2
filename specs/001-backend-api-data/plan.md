# Implementation Plan: Backend API & Data Layer

**Branch**: `001-backend-api-data` | **Date**: 2026-01-09 | **Spec**: ./spec.md
**Input**: Feature specification from `/specs/001-backend-api-data/spec.md`

## Summary

Deliver a stateless, multi-user backend for todo task management with persistent storage.
All operations are authenticated via bearer token, and all data access is scoped to the
authenticated user identity derived from the token.

Artifacts produced by this plan:
- `research.md` (technical context decisions)
- `data-model.md` (User + Task schema)
- `contracts/` (OpenAPI contract + error contract)
- `quickstart.md` (validation steps)

## Technical Context

**Language/Version**: Python 3.11+
**Primary Dependencies**: FastAPI, SQLModel (SQLAlchemy), PyJWT (or equivalent JWT verifier)
**Storage**: Neon Serverless PostgreSQL
**Testing**: pytest (integration tests for DB + authz)
**Target Platform**: Linux server (container-friendly)
**Project Type**: web (separate `backend/` and `frontend/` directories)
**Performance Goals**: p95 interactive operations remain responsive under typical hackathon load
**Constraints**:
- Backend stateless; persistence only via database
- Every endpoint requires a valid token (401 on missing/invalid/expired)
- Ownership enforcement on every operation
**Scale/Scope**: Multi-user; per-user task lists; no shared/team tasks

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Spec exists and includes acceptance scenarios + edge cases sufficient for
      autonomous execution.
- [x] All user-facing actions are authenticated; backend endpoints require JWT and
      return 401 on missing/invalid token.
- [x] Data access is scoped to the authenticated user; cross-user access is prevented.
- [x] Stack constraints honored (Next.js App Router, FastAPI, SQLModel, Neon, Better
      Auth JWT with `Authorization: Bearer <token>`).
- [x] Backend remains stateless; REST conventions + status codes are explicit.
- [x] Work will be executed via Claude Code workflows (no manual coding) and a PHR will
      be recorded for this prompt.

## Project Structure

### Documentation (this feature)

```text
specs/001-backend-api-data/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── tasks.openapi.yaml
│   └── errors.md
└── tasks.md
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── main.py                 # FastAPI app entry
│   ├── api/
│   │   └── v1/
│   │       └── tasks.py         # task endpoints
│   ├── auth/
│   │   └── jwt.py               # token verification + user identity extraction
│   ├── db/
│   │   ├── session.py           # SQLModel/SQLAlchemy session factory
│   │   └── models.py            # SQLModel entities
│   └── core/
│       └── config.py            # env configuration (DATABASE_URL, BETTER_AUTH_SECRET)
└── tests/
    ├── integration/
    └── contract/

frontend/                         # reserved for later features (out of scope here)
```

**Structure Decision**: Use a `backend/` and `frontend/` split consistent with the
constitution. This feature implements only backend code, but keeps the repo ready for the
full-stack application.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none) | (n/a) | (n/a) |

## Phase 0: Research (completed)

**Output**: `research.md`

Key resolved items:
- Python baseline and test framework
- Neon/Postgres as persistent store
- JWT verification with shared secret and user identity derived from token

## Phase 1: Design & Contracts (completed)

### Data model

**Output**: `data-model.md`

- User:
  - `id` (string) derived from token claim
- Task:
  - `id`
  - `user_id` (string) owner identifier
  - `title` (required)
  - `details` (optional)
  - `completed` (boolean)
  - timestamps

Ownership invariant:
- Every task row belongs to exactly one user (`Task.user_id`).
- Every read/write query must include `user_id = authenticated_user_id`.

### API contracts

**Outputs**:
- `contracts/tasks.openapi.yaml`
- `contracts/errors.md`

Endpoints (v1):
- `GET /v1/tasks` — list tasks (optionally filter by completion)
- `POST /v1/tasks` — create task
- `GET /v1/tasks/{task_id}` — get task
- `PUT /v1/tasks/{task_id}` — update task
- `DELETE /v1/tasks/{task_id}` — delete task
- `POST /v1/tasks/{task_id}/toggle` — toggle completion

Error strategy:
- `401 Unauthorized` for missing/invalid/expired token
- `404 Not Found` for missing task *or* task not owned by the caller (no existence leak)
- `422 Unprocessable Entity` for validation errors

### Validation guide

**Output**: `quickstart.md`

## Phase 2: Implementation Strategy (for /sp.tasks)

Implementation tasks should be organized around:
1) Foundations: project structure, config loading, DB session management, JWT verification
2) Task CRUD endpoints
3) Ownership enforcement tests (cross-user attempts)
4) Persistence validation (restart, then data remains)

## Testing & Validation Plan

Minimum validation required for this feature:
- Verify create/list/get/update/toggle/delete operate correctly against the database.
- Confirm user-scoped queries return only the caller’s tasks.
- Validate persistence across backend restarts (database remains source of truth).

Recommended automated tests:
- Integration tests covering:
  - 401 on missing/invalid token
  - 404 on cross-user access attempt
  - happy-path CRUD
