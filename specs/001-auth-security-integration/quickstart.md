# Quickstart: Authentication & Security Integration

## Overview
Guide to implementing and using the secure authentication system with Better Auth and JWT tokens.

## Prerequisites
- Node.js 18+ (for frontend)
- Python 3.11+ (for backend)
- Better Auth configured with JWT plugin
- Shared secret (BETTER_AUTH_SECRET) configured in both frontend and backend

## Environment Variables
Set these in both frontend and backend environments:
```bash
BETTER_AUTH_SECRET=your-super-secret-jwt-key-change-in-production
```

## Frontend Integration
1. Install Better Auth dependencies
2. Configure JWT plugin with shared secret
3. Implement login/register flows
4. Extract JWT tokens from session
5. Attach tokens to API requests using `Authorization: Bearer <token>` header

## Backend Integration
1. Install PyJWT dependency
2. Configure JWT verification middleware
3. Validate token signature against shared secret
4. Extract user identity from token claims
5. Enforce user isolation on all protected endpoints

## Testing Authentication
1. Register a new user via `/auth/register`
2. Login to receive JWT tokens
3. Make authenticated requests with `Authorization: Bearer <token>`
4. Verify unauthorized requests return 401 status

## Security Considerations
- Never log JWT tokens
- Use HTTPS in production
- Rotate shared secret periodically
- Validate token expiration consistently
- Enforce user isolation on all data access

## Troubleshooting
- If receiving 401 errors, verify JWT token is properly formatted and not expired
- Check that BETTER_AUTH_SECRET matches between frontend and backend
- Ensure Authorization header is properly formatted