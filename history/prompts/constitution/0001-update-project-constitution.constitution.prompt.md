---
id: 0001
title: "Update project constitution"
stage: constitution
date: 2026-01-09
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: unknown
command: /sp.constitution
labels: ["constitution","governance","spec-driven-dev","security"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - .specify/templates/plan-template.md
  - .specify/templates/spec-template.md
tests:
  - null
---

## Prompt

```text
/sp.constitution

Project: Todo Full-Stack Web Application (Hackathon Phase-2)

Core principles:
- Spec-driven development (no implementation without an explicit spec)
- Security by default (authentication and user isolation enforced everywhere)
- Deterministic behavior (same inputs always produce the same outputs)
- Separation of concerns (frontend, backend, auth clearly defined)
- Agentic implementation (all code generated from specs, no manual coding)

Key standards:
- All features must be fully specified before planning or implementation
- Every user-facing action must be authenticated and authorized
- User data must be strictly isolated across all layers
- API behavior must be explicit, testable, and unambiguous
- Error states and edge cases must be defined in specs
- All specs must be sufficient for autonomous agent execution

Constraints:
- Frontend: Next.js 16+ with App Router
- Backend: Python FastAPI
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth with JWT
- Communication: RESTful API with JSON
- Authentication method: JWT via Authorization Bearer header
- Shared secret via environment variable (BETTER_AUTH_SECRET)
- No manual coding allowed; implementation must follow Agentic Dev Stack workflow

Security requirements:
- All API endpoints require a valid JWT
- Requests without or with invalid JWT return 401 Unauthorized
- Authenticated user identity is derived from JWT only
- Task ownership must be enforced on every operation
- Cross-user data access is forbidden at all times
- Token expiration must be respected

Quality requirements:
- REST conventions must be followed consistently
- Correct HTTP status codes must be used
- Backend must be stateless
- Frontend must be responsive and auth-aware
- Database integrity must be preserved at all times

Success criteria:
- All required features implemented exactly as specified
- Users can only access and modify their own tasks
- Frontend, backend, and auth work together seamlessly
- System can be fully generated from specs without ambiguity
- Project passes functional, security, and spec-completeness review
```

## Response snapshot

- Updated the constitution template into a concrete constitution for the Todo Full-Stack Web
  Application, encoding spec-driven workflow, security-by-default, deterministic behavior,
  separation of concerns, and agentic implementation requirements.
- Added a Sync Impact Report and set governance metadata (version, ratified date, amended date).
- Propagated constitution-driven gates into `.specify/templates/plan-template.md` and added
  JWT/authz edge cases into `.specify/templates/spec-template.md`.

## Outcome

- ✅ Impact: Constitution is now project-specific and enforceable; planning/spec templates now
  reflect required gates and auth edge cases.
- 🧪 Tests: Not run (docs/template edits only).
- 📁 Files: Updated constitution + plan/spec templates.
- 🔁 Next prompts: Run `/sp.specify` for the first feature (e.g., auth + core todo flows).
- 🧠 Reflection: Keep future edits minimal and ensure every prompt gets a PHR.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): Not applicable.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Add a small checklist item in tasks generation to
  explicitly call out per-endpoint ownership enforcement when applicable.
