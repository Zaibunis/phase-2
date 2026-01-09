---

description: "Tasks for 001-backend-api-data implementation"
---

# Tasks: Backend API & Data Layer

**Input**: Design documents from `/specs/001-backend-api-data/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: OPTIONAL by template default. This feature includes a testing/validation plan; tasks below include integration + contract tests to ensure JWT gating and user isolation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/` (backend code), `frontend/` (reserved, out of scope)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create backend project directories per plan in backend/src/{api/v1,auth,db,core} and backend/tests/{integration,contract}
- [x] T002 Initialize Python project metadata for backend in backend/pyproject.toml (FastAPI, SQLModel, pytest, DB driver, JWT library)
- [x] T003 [P] Add backend environment template in backend/.env.example documenting DATABASE_URL and BETTER_AUTH_SECRET
- [x] T004 [P] Add tooling config for formatting/linting in backend/ (e.g., ruff/black config in pyproject.toml)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Implement environment config loader in backend/src/core/config.py (read DATABASE_URL, BETTER_AUTH_SECRET)
- [x] T006 Implement DB session factory in backend/src/db/session.py (connect using DATABASE_URL)
- [x] T007 Implement SQLModel entities in backend/src/db/models.py for User and Task (Task includes user_id, title, details, completed, timestamps)
- [x] T008 Implement token verification + identity extraction in backend/src/auth/jwt.py (verify signature; extract stable user_id claim)
- [x] T009 Implement FastAPI app entrypoint in backend/src/main.py and mount v1 router from backend/src/api/v1/tasks.py
- [x] T010 Implement shared error response helpers in backend/src/api/errors.py matching contracts/errors.md
- [x] T011 Implement request auth dependency in backend/src/api/deps.py that returns authenticated user_id (401 on missing/invalid/expired token)
- [x] T012 [P] Add a minimal OpenAPI docs smoke check endpoint exposure via FastAPI automatic docs (covered in backend/src/main.py)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Manage my tasks via API (Priority: P1) 🎯 MVP

**Goal**: Authenticated users can create tasks and list their own tasks.

**Independent Test**: Using a token for User A, create a task and list tasks; list returns the created task and nothing from other users.

### Tests for User Story 1 (OPTIONAL - included for security correctness) ⚠️

- [x] T013 [P] [US1] Contract test for GET /v1/tasks in backend/tests/contract/test_tasks_list_contract.py (response shape)
- [x] T014 [P] [US1] Contract test for POST /v1/tasks in backend/tests/contract/test_tasks_create_contract.py (201 response shape)
- [x] T015 [P] [US1] Integration test for auth gating (401) in backend/tests/integration/test_auth_required.py
- [x] T016 [P] [US1] Integration test for create+list happy path in backend/tests/integration/test_tasks_create_list.py
- [x] T017 [P] [US1] Integration test for user isolation on list (A cannot see B) in backend/tests/integration/test_tasks_list_isolation.py

### Implementation for User Story 1

- [x] T018 [US1] Implement POST /v1/tasks endpoint in backend/src/api/v1/tasks.py (create task scoped to user_id)
- [x] T019 [US1] Implement GET /v1/tasks endpoint in backend/src/api/v1/tasks.py (list tasks filtered by user_id; optional completed filter)
- [x] T020 [US1] Add request/response schemas in backend/src/api/schemas/tasks.py for create + list responses
- [x] T021 [US1] Ensure validation errors return 422 and missing/invalid auth returns 401 (wire deps + error helpers)

**Checkpoint**: User Story 1 functional and independently testable

---

## Phase 4: User Story 2 - Update, complete, and delete my tasks (Priority: P2)

**Goal**: Authenticated users can update a task, toggle completion, and delete tasks they own.

**Independent Test**: Using a token for User A, update/toggle/delete a task created by A; verify results via GET/list.

### Tests for User Story 2 (OPTIONAL - included for security correctness) ⚠️

- [x] T022 [P] [US2] Contract test for PUT /v1/tasks/{task_id} in backend/tests/contract/test_tasks_update_contract.py
- [x] T023 [P] [US2] Contract test for POST /v1/tasks/{task_id}/toggle in backend/tests/contract/test_tasks_toggle_contract.py
- [x] T024 [P] [US2] Contract test for DELETE /v1/tasks/{task_id} in backend/tests/contract/test_tasks_delete_contract.py
- [x] T025 [P] [US2] Integration test for update/toggle/delete happy path in backend/tests/integration/test_tasks_update_toggle_delete.py
- [x] T026 [P] [US2] Integration test for cross-user protection (404) on update/toggle/delete in backend/tests/integration/test_tasks_mutation_isolation.py

### Implementation for User Story 2

- [x] T027 [US2] Implement PUT /v1/tasks/{task_id} in backend/src/api/v1/tasks.py (lookup by {task_id, user_id}; update title/details)
- [x] T028 [US2] Implement POST /v1/tasks/{task_id}/toggle in backend/src/api/v1/tasks.py (lookup by {task_id, user_id}; flip completed)
- [x] T029 [US2] Implement DELETE /v1/tasks/{task_id} in backend/src/api/v1/tasks.py (lookup by {task_id, user_id}; delete; return 204)
- [x] T030 [US2] Extend schemas in backend/src/api/schemas/tasks.py for update request and standard task response
- [x] T031 [US2] Ensure cross-user access returns 404 (not 403) to avoid existence leaks (per contracts/errors.md)

**Checkpoint**: User Story 2 functional and independently testable

---

## Phase 5: User Story 3 - Retrieve a single task safely (Priority: P3)

**Goal**: Authenticated users can retrieve a single task by id, scoped to ownership.

**Independent Test**: User A can GET their task by id; User B gets 404 for A’s task; non-existent id returns 404.

### Tests for User Story 3 (OPTIONAL - included for security correctness) ⚠️

- [x] T032 [P] [US3] Contract test for GET /v1/tasks/{task_id} in backend/tests/contract/test_tasks_get_contract.py
- [x] T033 [P] [US3] Integration test for get-by-id happy path + 404 on missing in backend/tests/integration/test_tasks_get_by_id.py
- [x] T034 [P] [US3] Integration test for cross-user protection (404) on get in backend/tests/integration/test_tasks_get_isolation.py

### Implementation for User Story 3

- [x] T035 [US3] Implement GET /v1/tasks/{task_id} in backend/src/api/v1/tasks.py (lookup by {task_id, user_id}; return 404 if none)
- [x] T036 [US3] Ensure returned task response shape matches OpenAPI schema in specs/001-backend-api-data/contracts/tasks.openapi.yaml

**Checkpoint**: User Story 3 functional and independently testable

---

## Final Phase: Polish & Cross-Cutting Concerns

- [x] T037 Add persistence validation notes into backend/README.md (how to run app and verify restart persistence)
- [x] T038 [P] Add minimal logging guidelines in backend/src/main.py (avoid logging tokens; log request ids if present)
- [x] T039 [P] Add basic database integrity checks (e.g., non-null user_id) in backend/src/db/models.py

---

## Dependency Graph (User Story Completion Order)

- Phase 1 (Setup) → Phase 2 (Foundational) → Phase 3 (US1)
- US2 depends on US1 (needs task creation to exercise update/toggle/delete flows)
- US3 depends on US1 (needs task creation to exercise get-by-id)

## Parallel Execution Examples

- Setup: T003 and T004 can run in parallel after T001/T002.
- US1 tests (T013–T017) can be authored in parallel once foundations are ready.
- US2 contract tests (T022–T024) can be authored in parallel.
- US3 tests (T032–T034) can be authored in parallel.

## Suggested MVP Scope

- MVP = Phase 1 + Phase 2 + Phase 3 (User Story 1). This supports authenticated create + list
  with user isolation, and unlocks incremental delivery of US2/US3.
