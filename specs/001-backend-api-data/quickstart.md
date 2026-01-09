# Quickstart: Backend API & Data Layer (Validation)

This quickstart is for validating the backend feature independently.

## Prerequisites

- You have a running backend service.
- You have a database configured and reachable by the backend.
- You have a valid authentication token for a test user.

## Environment Variables

The backend requires configuration via environment variables (no hardcoded secrets):

- `DATABASE_URL`: database connection string
- `BETTER_AUTH_SECRET`: secret used to verify token signatures

## Smoke Test Checklist

### 1) Authentication gate

- Call any task endpoint without an authentication token.
- Expected: `401 Unauthorized`.

### 2) Create a task

- Create a task with a title (and optional details).
- Expected: `201 Created` and response includes a task identifier.

### 3) List tasks

- Request the task list.
- Expected: `200 OK` and response includes the created task.

### 4) Update task

- Update task title/details.
- Expected: `200 OK` and the returned task reflects updates.

### 5) Toggle completion

- Toggle completion for the task.
- Expected: `200 OK` and completion state flips.

### 6) Delete task

- Delete the task.
- Expected: `204 No Content`.

### 7) Verify persistence

- Create a task.
- Restart the backend process.
- Retrieve the task (by listing or by id).
- Expected: task is still present.

### 8) Verify user isolation

- With token for User A: create a task.
- With token for User B: attempt to read/update/delete User A’s task.
- Expected: `404 Not Found` (do not reveal cross-user existence).
