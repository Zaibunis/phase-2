---
name: auth-skill
description: Implement secure authentication systems including signup, signin, password hashing, JWT tokens, and Better Auth integration.
---

# Authentication Skill

## Instructions

1. **User Signup**
   - Validate user input (email, password)
   - Hash passwords before storage
   - Prevent duplicate accounts

2. **User Signin**
   - Verify credentials securely
   - Compare hashed passwords
   - Handle invalid login attempts

3. **Password Security**
   - Use strong hashing algorithms (bcrypt / argon2)
   - Apply salting
   - Never store plain-text passwords

4. **JWT Authentication**
   - Generate access tokens on login
   - Set token expiration
   - Verify tokens on protected routes

5. **Better Auth Integration**
   - Configure Better Auth providers
   - Handle sessions and tokens
   - Enable secure logout and refresh flows

## Best Practices
- Enforce strong password policies
- Use HTTPS for all auth routes
- Store secrets in environment variables
- Implement token expiration and rotation
- Protect routes with middleware

## Example Structure
```ts
// Signup
const hashedPassword = await bcrypt.hash(password, 10);
await db.user.create({
  email,
  password: hashedPassword,
});

// Signin
const isValid = await bcrypt.compare(password, user.password);
if (!isValid) throw new Error("Invalid credentials");

// JWT
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);