# Data Model: Backend API & Data Layer

**Feature**: 001-backend-api-data
**Date**: 2026-01-09

## Entities

### User

**Purpose**: Represents an authenticated account identity.

**Source of truth**: The backend derives the user identity from the authentication token.

**Fields**:
- `id` (string): Stable unique identifier for the user (from JWT claim).
- `created_at` (timestamp): When the user record was first observed/created.

**Notes**:
- The backend does not authenticate users itself; it verifies tokens.
- Whether a user row must exist prior to task creation is implementation-defined; the
  backend may create the user row on first-seen token.

---

### Task

**Purpose**: Represents a todo item owned by exactly one user.

**Fields**:
- `id` (string or integer): Unique task identifier.
- `user_id` (string): Owner user identifier (FK/reference to User `id`).
- `title` (string): Short description of the task.
- `details` (string, optional): Longer notes.
- `completed` (boolean): Completion state.
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Relationships**:
- User 1 → N Tasks
- Task N → 1 User (required)

**Validation rules**:
- `title` is required and must not be empty.
- `details` may be empty/omitted.

**State transitions**:
- `completed` can transition `false → true` and `true → false` via the toggle operation.

## Data Integrity & Constraints

- `Task.user_id` MUST be present for every task.
- Queries and write operations MUST always scope by `user_id`.
- Deleting a user is out of scope; tasks are not shared between users.

## Indexing (logical)

- Index on `(Task.user_id, Task.created_at)` to support listing tasks for a user.
- Uniqueness for `Task.id`.
