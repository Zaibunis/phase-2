# Error Handling Contract

This document defines the error-handling strategy and HTTP status usage for the backend.

## Principles

- Every endpoint requires a valid authentication token.
- The authenticated user identity is derived from the token.
- All task operations are scoped to the authenticated user.
- Errors must not leak other users’ data.

## Status Codes

- **200 OK**: Successful read/update/toggle responses that return content.
- **201 Created**: Successful task creation.
- **204 No Content**: Successful deletion.
- **400 Bad Request**: Malformed request that is syntactically valid but semantically
  unacceptable (e.g., invalid toggle action if ever applicable).
- **401 Unauthorized**: Missing/invalid/expired token.
- **404 Not Found**: Resource does not exist *for the authenticated user*.
  - If a task exists but belongs to another user, the response MUST still be 404.
- **422 Unprocessable Entity**: Payload validation errors.
- **500 Internal Server Error**: Unexpected server errors.

## Error Response Shape

All non-2xx responses return a JSON object with this shape:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": { "any": "json" }
  }
}
```

Notes:
- `details` is optional and may be omitted.
- Authentication tokens must never be echoed back or logged.
