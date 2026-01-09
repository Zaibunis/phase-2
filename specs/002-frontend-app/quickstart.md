# Quickstart Guide: Frontend Application (UI + API Client)

**Feature**: 002-frontend-app | **Date**: 2026-01-10 | **Status**: Complete

## Overview

This quickstart guide provides the essential steps to set up, run, and begin developing the frontend application. The application is built with Next.js 16+ using App Router, integrated with Better Auth for authentication, and designed to consume secured backend APIs using JWT authentication.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **npm** or **yarn**: Package manager (npm 8+ or yarn 1.22+)
- **Git**: Version control system
- **Backend API**: Running instance of the backend service (covered in backend quickstart)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd frontend
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the frontend root directory:

```env
# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_API_BASE_URL_PROD=https://your-backend-domain.com/api

# Better Auth Configuration
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
BETTER_AUTH_SECRET=your-super-secret-jwt-secret-here

# Additional Configuration
NEXT_PUBLIC_APP_NAME=Todo App
NEXT_PUBLIC_BASE_PATH=/
```

### 4. Run the Development Server

```bash
# Start the development server
npm run dev

# Or with yarn
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/          # Authentication-related pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── layout.tsx
│   │   ├── (protected)/     # Protected routes
│   │   │   ├── dashboard/
│   │   │   ├── tasks/
│   │   │   └── layout.tsx
│   │   ├── api/             # Client-side API routes
│   │   ├── globals.css      # Global styles
│   │   └── layout.tsx       # Root layout
│   ├── components/          # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   ├── tasks/          # Task management components
│   │   ├── ui/             # Base UI components
│   │   └── providers/      # Context providers
│   ├── lib/                # Utility functions
│   │   ├── auth.ts         # Authentication utilities
│   │   ├── api-client.ts   # API client implementation
│   │   └── types.ts        # Type definitions
│   ├── services/           # Business logic services
│   │   ├── auth-service.ts # Authentication service
│   │   └── task-service.ts # Task management service
│   └── hooks/              # Custom React hooks
│       ├── use-auth.ts     # Authentication hook
│       └── use-tasks.ts    # Task management hook
├── public/                 # Static assets
├── .env.local             # Environment variables
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Key Development Commands

### Development
```bash
npm run dev              # Start development server with hot reload
```

### Building
```bash
npm run build            # Build the application for production
npm run start            # Start production server
```

### Testing
```bash
npm run test             # Run unit tests
npm run test:e2e         # Run end-to-end tests
npm run test:watch       # Run tests in watch mode
```

### Linting & Formatting
```bash
npm run lint             # Check code for linting errors
npm run lint:fix         # Fix linting errors automatically
npm run format           # Format code with Prettier
npm run type-check       # Run TypeScript type checking
```

## Authentication Integration

### Setting up Better Auth

The application uses Better Auth for user authentication. The configuration is located in `src/lib/auth.ts`:

```typescript
import { initAuth } from 'better-auth/react';

export const auth = initAuth({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  // Additional configuration options
});
```

### Using Authentication in Components

```typescript
'use client';

import { useAuth } from '@/hooks/use-auth';

export default function ProtectedComponent() {
  const { user, isLoading, signIn, signOut } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## API Client Usage

The application uses a centralized API client for backend communication. Access it through the service layer:

```typescript
// In your components or services
import { taskService } from '@/services/task-service';

// Create a new task
const newTask = await taskService.create({
  title: 'New task',
  description: 'Task description',
  completed: false
});

// Get user's tasks
const tasks = await taskService.getAll();

// Update a task
const updatedTask = await taskService.update(taskId, {
  title: 'Updated title',
  completed: true
});
```

## Environment Variables

### Required Variables
- `NEXT_PUBLIC_API_BASE_URL`: Base URL for backend API
- `BETTER_AUTH_SECRET`: Secret key for JWT token verification

### Optional Variables
- `NEXT_PUBLIC_APP_NAME`: Display name for the application
- `NEXT_PUBLIC_BASE_PATH`: Base path if deployed in subdirectory

## Running with Backend

To run the full application, you need both frontend and backend:

1. Start the backend API server
2. Update `NEXT_PUBLIC_API_BASE_URL` to point to your backend
3. Run the frontend with `npm run dev`

## Common Development Tasks

### Creating a New Page
1. Create a new directory in `src/app/`
2. Add a `page.tsx` file with your component
3. Implement proper authentication checks if needed

### Adding a New Component
1. Create the component in `src/components/`
2. Follow the atomic design pattern
3. Add proper TypeScript interfaces
4. Include unit tests

### Adding API Endpoints
1. Update the API client in `src/lib/api-client.ts`
2. Add corresponding service methods
3. Update type definitions if needed

## Testing

### Unit Tests
Unit tests are located in `__tests__/` or alongside components with `.test.tsx` extension:

```bash
npm run test
```

### End-to-End Tests
E2E tests are in the `tests/` directory and use Playwright:

```bash
npm run test:e2e
```

## Deployment

### Build for Production
```bash
npm run build
```

### Environment-Specific Configuration
Update environment variables for production deployment:
- `NEXT_PUBLIC_API_BASE_URL_PROD`: Production backend URL
- Properly configured `BETTER_AUTH_SECRET`

## Troubleshooting

### Common Issues

1. **Authentication not working**:
   - Verify `BETTER_AUTH_SECRET` matches backend
   - Check that backend is running and accessible

2. **API calls failing**:
   - Confirm `NEXT_PUBLIC_API_BASE_URL` is correct
   - Check network connectivity to backend

3. **TypeScript errors**:
   - Run `npm run type-check` to identify issues
   - Verify type definitions in `src/lib/types.ts`

4. **Styling issues**:
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS classes

### Development Tips

- Use the App Router for new pages
- Leverage server components for data fetching
- Use client components for interactive elements
- Implement proper error boundaries
- Follow the folder structure conventions
- Use TypeScript for all new code

## Next Steps

1. Review the complete API contracts in `specs/002-frontend-app/contracts/api-contracts.md`
2. Explore the data models in `specs/002-frontend-app/data-model.md`
3. Check the implementation plan in `specs/002-frontend-app/plan.md`
4. Run through the user stories in `specs/002-frontend-app/spec.md`