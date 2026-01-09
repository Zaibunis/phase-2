# Todo Backend API

A FastAPI-based backend service for managing user tasks with authentication and persistence.

## Features

- JWT-based authentication with Better Auth integration
- User isolation - users can only access their own tasks
- Full CRUD operations on tasks
- Task completion toggling
- RESTful API with proper HTTP status codes

## Tech Stack

- Python 3.11+
- FastAPI
- SQLModel (SQLAlchemy + Pydantic)
- PostgreSQL (via Neon Serverless)
- PyJWT for token verification

## Setup

1. Install dependencies:
   ```bash
   pip install -e ".[dev]"
   ```

2. Create a `.env` file with the required environment variables:
   ```bash
   DATABASE_URL="postgresql://..."
   BETTER_AUTH_SECRET="your-secret-key"
   ```

3. Run the application:
   ```bash
   uvicorn src.main:app --reload
   ```

## API Endpoints

### Authentication
All endpoints require `Authorization: Bearer <token>` header.

### Tasks API
- `GET /v1/tasks` - List user's tasks (with optional `completed` query param)
- `POST /v1/tasks` - Create a new task
- `GET /v1/tasks/{task_id}` - Get a single task
- `PUT /v1/tasks/{task_id}` - Update a task
- `POST /v1/tasks/{task_id}/toggle` - Toggle task completion status
- `DELETE /v1/tasks/{task_id}` - Delete a task

## Persistence Validation

The application uses SQLModel with PostgreSQL for data persistence. To verify restart persistence:

1. Start the application: `uvicorn src.main:app --reload`
2. Create a task using the API
3. Stop and restart the application
4. Verify the task still exists by retrieving it via the API

## Development

Run tests:
```bash
python -m pytest
```

The application includes both contract and integration tests to ensure proper functionality and security isolation between users.