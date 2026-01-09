# Tasks: Authentication & Security Integration

**Input**: Design documents from `/specs/001-auth-security-integration/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Reference**: specs/001-auth-security-integration/spec.md for user stories, acceptance scenarios, functional requirements

---

## Phase 1: Setup & Project Initialization

**Goal**: Initialize project structure and configure shared security settings

- [x] T001 Create backend directory structure per implementation plan (backend/src/{api,auth,models,services,config})
- [x] T002 Create frontend directory structure per implementation plan (frontend/src/{app,components,services,lib})
- [x] T003 [P] Set up backend project with FastAPI, SQLModel, PyJWT dependencies in pyproject.toml
- [x] T004 [P] Set up frontend project with Next.js, Better Auth dependencies in package.json
- [x] T005 Define BETTER_AUTH_SECRET environment variable in shared .env file
- [x] T006 [P] Create backend configuration module (src/config.py) with security settings

---

## Phase 2: Foundational Components

**Goal**: Establish foundational authentication infrastructure that all user stories depend on

- [x] T007 Create User model in backend/src/models/user.py with id, email, timestamps, is_active fields
- [x] T008 Create JWT utility functions in backend/src/auth/jwt.py for token creation/verification
- [x] T009 Create authentication dependency in backend/src/api/dependencies/auth.py for token validation
- [x] T010 Create user service in backend/src/services/user_service.py for user operations
- [x] T011 [P] Create API error handlers in backend/src/api/errors.py for authentication failures
- [x] T012 [P] Set up database initialization in backend/src/db/init.py
- [x] T013 Create Better Auth configuration in frontend/src/lib/auth.ts with JWT plugin
- [x] T014 Create API client in frontend/src/services/api-client.ts with token attachment

---

## Phase 3: User Story 1 - User Registration & Login (Priority: P1)

**Goal**: Users can register for a new account using email and password, then sign in to access their personal todo list. The system authenticates users via Better Auth and issues JWT tokens upon successful authentication.

**Independent Test**: Using Better Auth UI, a user can sign up with email/password, receive JWT tokens, and use those tokens to access protected API endpoints.

**Tests** (if requested):
- [x] T015 [P] [US1] Contract test for /auth/register response shape in backend/tests/contract/test_auth_register_contract.py
- [x] T016 [P] [US1] Contract test for /auth/login response shape in backend/tests/contract/test_auth_login_contract.py

**Implementation**:
- [x] T017 [US1] Implement /auth/register endpoint in backend/src/api/routes/auth.py
- [x] T018 [US1] Implement /auth/login endpoint in backend/src/api/routes/auth.py
- [x] T019 [US1] Create authentication service in backend/src/services/auth_service.py for user registration/login
- [x] T020 [US1] Implement user creation logic in User model with validation
- [x] T021 [US1] Create JWT token issuance logic in auth service
- [x] T022 [US1] Create frontend registration form component with Better Auth integration
- [x] T023 [US1] Create frontend login form component with Better Auth integration
- [x] T024 [US1] Implement token extraction from Better Auth session in frontend
- [x] T025 [US1] Integrate registration flow with backend API endpoint
- [x] T026 [US1] Integrate login flow with backend API endpoint

---

## Phase 4: User Story 2 - Secure API Access (Priority: P1)

**Goal**: Authenticated users can access their personal data through the API by including their JWT token in the Authorization header. The backend validates the token and enforces user isolation.

**Independent Test**: With a valid JWT token, a user can make API requests that return their own data but receive 401 errors for unauthorized access attempts.

**Tests** (if requested):
- [ ] T027 [P] [US2] Contract test for protected endpoint response with valid JWT in backend/tests/contract/test_protected_endpoint_contract.py
- [ ] T028 [P] [US2] Contract test for 401 response with invalid JWT in backend/tests/contract/test_unauthorized_contract.py

**Implementation**:
- [ ] T029 [US2] Create protected API route dependency with user isolation enforcement
- [ ] T030 [US2] Implement user-scoped data access in User service
- [ ] T031 [US2] Update existing API endpoints to require authentication
- [ ] T032 [US2] Implement user data scoping logic in service layer
- [ ] T033 [US2] Create middleware to attach authenticated user context to requests
- [ ] T034 [US2] Implement frontend API client to automatically attach JWT tokens
- [ ] T035 [US2] Create utility functions to manage JWT tokens in frontend state
- [ ] T036 [US2] Update frontend components to use authenticated API calls
- [ ] T037 [US2] Implement error handling for 401 responses in frontend

---

## Phase 5: User Story 3 - Token Validation & Expiration (Priority: P2)

**Goal**: The system properly handles JWT token validation, expiration, and invalidation. Expired or malformed tokens are rejected appropriately.

**Independent Test**: Requests with expired or tampered JWT tokens are rejected with appropriate error responses.

**Tests** (if requested):
- [ ] T038 [P] [US3] Contract test for expired token rejection in backend/tests/contract/test_expired_token_contract.py
- [ ] T039 [P] [US3] Contract test for malformed token rejection in backend/tests/contract/test_malformed_token_contract.py

**Implementation**:
- [ ] T040 [US3] Enhance JWT utility functions to validate expiration and signature
- [ ] T041 [US3] Implement token refresh mechanism in authentication service
- [ ] T042 [US3] Add token validation middleware with detailed error responses
- [ ] T043 [US3] Create token validation utilities for frontend to check expiration
- [ ] T044 [US3] Implement automatic token refresh logic in frontend
- [ ] T045 [US3] Add token validation checks before API requests in frontend
- [ ] T046 [US3] Create error handling for expired token scenarios in frontend
- [ ] T047 [US3] Implement token cleanup on expiration in frontend

---

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: Final integration, security hardening, and documentation

- [ ] T048 Add comprehensive logging for authentication events
- [ ] T049 Implement rate limiting for authentication endpoints
- [ ] T050 Add security headers to API responses
- [ ] T051 Create comprehensive authentication documentation
- [ ] T052 Add integration tests for complete authentication flow
- [ ] T053 Perform security audit of authentication implementation
- [ ] T054 Optimize JWT validation performance to meet <100ms target
- [ ] T055 Add monitoring and alerting for authentication failures

---

## Dependencies & Execution Order

**User Story Completion Order**: US1 → US2 → US3 (US2 and US3 depend on US1 foundation)

**Parallel Execution Examples**:
- T015-T016: Contract tests can run in parallel during US1
- T017-T018: Register and login endpoints can be developed in parallel during US1
- T027-T028: Contract tests can run in parallel during US2
- T038-T039: Contract tests can run in parallel during US3

**Implementation Strategy**:
1. MVP: Complete US1 (registration/login) with basic token functionality
2. Incremental: Add US2 (secure API access) with user isolation
3. Enhancement: Add US3 (token validation & expiration) with advanced security
4. Polish: Complete cross-cutting concerns and optimizations