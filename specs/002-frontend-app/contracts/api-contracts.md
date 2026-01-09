# API Contracts: Frontend-Backend Communication

**Feature**: 002-frontend-app | **Date**: 2026-01-10 | **Status**: Complete

## Overview

This document defines the API contracts between the frontend application and the backend services. These contracts specify the request/response formats, authentication requirements, and error handling patterns that both sides must adhere to.

## Authentication Endpoints

### 1. User Registration

**Endpoint**: `POST /api/auth/register`
**Authentication**: None (public endpoint)

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Request Headers**:
- `Content-Type: application/json`

**Successful Response (201)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-string",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt-token-string",
    "expiresAt": "2026-01-10T15:30:00.000Z"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Invalid input data
```json
{
  "error": {
    "message": "Invalid email format or password too weak",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      },
      {
        "field": "password",
        "message": "Must be at least 8 characters long"
      }
    ]
  }
}
```

- `409 Conflict`: User already exists
```json
{
  "error": {
    "message": "User with this email already exists",
    "code": "USER_EXISTS"
  }
}
```

### 2. User Login

**Endpoint**: `POST /api/auth/login`
**Authentication**: None (public endpoint)

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Request Headers**:
- `Content-Type: application/json`

**Successful Response (200)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-string",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt-token-string",
    "expiresAt": "2026-01-10T15:30:00.000Z"
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid credentials
```json
{
  "error": {
    "message": "Invalid email or password",
    "code": "INVALID_CREDENTIALS"
  }
}
```

- `400 Bad Request`: Invalid input
```json
{
  "error": {
    "message": "Email and password are required",
    "code": "VALIDATION_ERROR"
  }
}
```

### 3. User Logout

**Endpoint**: `POST /api/auth/logout`
**Authentication**: Required (JWT token)

**Request Headers**:
- `Authorization: Bearer {jwt-token}`
- `Content-Type: application/json`

**Successful Response (200)**:
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or expired token
```json
{
  "error": {
    "message": "Unauthorized: Invalid or expired token",
    "code": "UNAUTHORIZED"
  }
}
```

## Task Management Endpoints

### 4. Create Task

**Endpoint**: `POST /api/tasks`
**Authentication**: Required (JWT token)

**Request Headers**:
- `Authorization: Bearer {jwt-token}`
- `Content-Type: application/json`

**Request Body**:
```json
{
  "title": "New task title",
  "description": "Optional task description",
  "completed": false
}
```

**Successful Response (201)**:
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "uuid-string",
      "title": "New task title",
      "description": "Optional task description",
      "completed": false,
      "userId": "user-uuid-string",
      "createdAt": "2026-01-10T10:30:00.000Z",
      "updatedAt": "2026-01-10T10:30:00.000Z"
    }
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or expired token
```json
{
  "error": {
    "message": "Unauthorized: Invalid or expired token",
    "code": "UNAUTHORIZED"
  }
}
```

- `400 Bad Request`: Validation error
```json
{
  "error": {
    "message": "Title is required",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "title",
        "message": "Title cannot be empty"
      }
    ]
  }
}
```

### 5. Get User Tasks

**Endpoint**: `GET /api/tasks`
**Authentication**: Required (JWT token)

**Request Headers**:
- `Authorization: Bearer {jwt-token}`

**Query Parameters**:
- `limit` (optional): Number of tasks to return (default: 10, max: 100)
- `offset` (optional): Number of tasks to skip (default: 0)
- `status` (optional): Filter by completion status ('all', 'active', 'completed')
- `sort` (optional): Sort by field ('createdAt', 'updatedAt', 'title')
- `order` (optional): Sort order ('asc', 'desc')

**Successful Response (200)**:
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "uuid-string",
        "title": "Task title",
        "description": "Task description",
        "completed": false,
        "userId": "user-uuid-string",
        "createdAt": "2026-01-10T10:30:00.000Z",
        "updatedAt": "2026-01-10T10:30:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "limit": 10,
      "offset": 0,
      "hasMore": false
    }
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or expired token
```json
{
  "error": {
    "message": "Unauthorized: Invalid or expired token",
    "code": "UNAUTHORIZED"
  }
}
```

### 6. Get Task by ID

**Endpoint**: `GET /api/tasks/{taskId}`
**Authentication**: Required (JWT token)

**Request Headers**:
- `Authorization: Bearer {jwt-token}`

**Successful Response (200)**:
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "uuid-string",
      "title": "Task title",
      "description": "Task description",
      "completed": false,
      "userId": "user-uuid-string",
      "createdAt": "2026-01-10T10:30:00.000Z",
      "updatedAt": "2026-01-10T10:30:00.000Z"
    }
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or expired token
```json
{
  "error": {
    "message": "Unauthorized: Invalid or expired token",
    "code": "UNAUTHORIZED"
  }
}
```

- `404 Not Found`: Task not found
```json
{
  "error": {
    "message": "Task not found",
    "code": "TASK_NOT_FOUND"
  }
}
```

- `403 Forbidden`: User doesn't have access to this task
```json
{
  "error": {
    "message": "Access denied: You don't have permission to access this task",
    "code": "FORBIDDEN_ACCESS"
  }
}
```

### 7. Update Task

**Endpoint**: `PUT /api/tasks/{taskId}`
**Authentication**: Required (JWT token)

**Request Headers**:
- `Authorization: Bearer {jwt-token}`
- `Content-Type: application/json`

**Request Body**:
```json
{
  "title": "Updated task title",
  "description": "Updated task description",
  "completed": true
}
```

**Successful Response (200)**:
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "uuid-string",
      "title": "Updated task title",
      "description": "Updated task description",
      "completed": true,
      "userId": "user-uuid-string",
      "createdAt": "2026-01-10T10:30:00.000Z",
      "updatedAt": "2026-01-10T11:45:00.000Z"
    }
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or expired token
```json
{
  "error": {
    "message": "Unauthorized: Invalid or expired token",
    "code": "UNAUTHORIZED"
  }
}
```

- `404 Not Found`: Task not found
```json
{
  "error": {
    "message": "Task not found",
    "code": "TASK_NOT_FOUND"
  }
}
```

- `403 Forbidden`: User doesn't have access to this task
```json
{
  "error": {
    "message": "Access denied: You don't have permission to update this task",
    "code": "FORBIDDEN_ACCESS"
  }
}
```

### 8. Delete Task

**Endpoint**: `DELETE /api/tasks/{taskId}`
**Authentication**: Required (JWT token)

**Request Headers**:
- `Authorization: Bearer {jwt-token}`

**Successful Response (200)**:
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or expired token
```json
{
  "error": {
    "message": "Unauthorized: Invalid or expired token",
    "code": "UNAUTHORIZED"
  }
}
```

- `404 Not Found`: Task not found
```json
{
  "error": {
    "message": "Task not found",
    "code": "TASK_NOT_FOUND"
  }
}
```

- `403 Forbidden`: User doesn't have access to this task
```json
{
  "error": {
    "message": "Access denied: You don't have permission to delete this task",
    "code": "FORBIDDEN_ACCESS"
  }
}
```

### 9. Toggle Task Completion

**Endpoint**: `PATCH /api/tasks/{taskId}/toggle`
**Authentication**: Required (JWT token)

**Request Headers**:
- `Authorization: Bearer {jwt-token}`
- `Content-Type: application/json`

**Request Body**:
```json
{
  "completed": true
}
```

**Successful Response (200)**:
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "uuid-string",
      "title": "Task title",
      "description": "Task description",
      "completed": true,
      "userId": "user-uuid-string",
      "createdAt": "2026-01-10T10:30:00.000Z",
      "updatedAt": "2026-01-10T11:45:00.000Z"
    }
  }
}
```

**Error Responses**:
Same as Update Task endpoint.

## Health Check Endpoint

### 10. API Health Check

**Endpoint**: `GET /api/health`
**Authentication**: Optional

**Successful Response (200)**:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-10T10:30:00.000Z",
  "version": "1.0.0"
}
```

## Common Headers

### Authentication Header
All authenticated endpoints require:
- `Authorization: Bearer {jwt-token}`

### Content Type
Most endpoints expect:
- `Content-Type: application/json`

## Common Error Response Format

All error responses follow this format:
```json
{
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE_STRING",
    "details": [
      {
        "field": "field_name",
        "message": "Specific field error message"
      }
    ]
  }
}
```

## Common Success Response Format

Most successful responses follow this format:
```json
{
  "success": true,
  "data": {
    // Response data object
  },
  "message": "Optional success message"
}
```

For operations without return data:
```json
{
  "success": true,
  "message": "Operation completed successfully"
}
```

## Rate Limiting

All endpoints are subject to rate limiting:
- Auth endpoints: 5 requests per minute per IP
- Task endpoints: 100 requests per minute per user
- Health endpoint: 1000 requests per minute per IP

Rate limited responses include:
```json
{
  "error": {
    "message": "Rate limit exceeded",
    "code": "RATE_LIMIT_EXCEEDED"
  }
}
```

And headers:
- `X-RateLimit-Limit`: Request limit
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Time until reset

## CORS Policy

The API supports CORS for the frontend origin:
- `Access-Control-Allow-Origin`: [frontend-domain]
- `Access-Control-Allow-Methods`: GET, POST, PUT, PATCH, DELETE
- `Access-Control-Allow-Headers`: Content-Type, Authorization