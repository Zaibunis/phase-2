# Data Model: Authentication & Security Integration

## Entities

### User
**Description**: Represents an authenticated user in the system
- **id**: UUID (Primary Key) - Unique identifier for the user
- **email**: String - User's email address (unique, validated)
- **created_at**: DateTime - Timestamp of account creation
- **updated_at**: DateTime - Timestamp of last account update
- **is_active**: Boolean - Account status (default: true)

**Relationships**:
- One-to-many with Task entity (user owns many tasks)
- Referenced by JWT token claims

**Validation Rules**:
- Email must be valid email format
- Email must be unique across all users
- id must be globally unique

### JWT Token
**Description**: JSON Web Token containing user identity and authentication claims
- **header**: Object - Algorithm and token type (automatically generated)
- **payload**: Object - Contains user_id, email, exp (expiration), iat (issued at)
- **signature**: String - Cryptographic signature (automatically generated)

**State Transitions**:
- Valid → Expired (automatically when exp timestamp reached)
- Valid/Expired → Invalid (when signature verification fails)

**Validation Rules**:
- Must contain valid user_id claim
- Must contain valid expiration timestamp
- Signature must match shared secret

### Authentication Session
**Description**: Temporary representation of authenticated user state (stateless)
- **token**: String - The JWT token string
- **user_id**: UUID - Extracted from token payload
- **expires_at**: DateTime - Expiration time from token
- **scopes**: Array<String> - Permissions granted (currently unused)

**Relationships**:
- Maps to User entity via user_id
- No persistent storage (stateless)

**Validation Rules**:
- Token must be properly formatted JWT
- Token must pass signature verification
- Token must not be expired
- user_id must correspond to existing User