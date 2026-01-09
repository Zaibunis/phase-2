---
name: backend-api-foundation
description: Generate backend routes, handle request/response logic, and connect applications to databases. Use for building scalable APIs.
---

# Backend API Development

## Instructions

1. **Route Creation**
   - Define RESTful routes (GET, POST, PUT, DELETE)
   - Group routes by resource
   - Use clear and consistent URL patterns

2. **Request & Response Handling**
   - Parse request bodies, params, and query strings
   - Validate incoming data
   - Send structured JSON responses
   - Handle errors with proper HTTP status codes

3. **Database Connectivity**
   - Connect to a database (SQL or NoSQL)
   - Implement CRUD operations
   - Use environment variables for credentials
   - Handle connection errors gracefully

## Best Practices
- Follow REST conventions
- Keep controllers thin and logic modular
- Use async/await for database operations
- Never expose sensitive data in responses
- Centralize error handling

## Example Structure
```js
// routes/user.routes.js
import express from "express";
import { getUsers, createUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", createUser);

export default router;
