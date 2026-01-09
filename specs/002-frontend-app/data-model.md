# Data Model: Frontend Application (UI + API Client)

**Feature**: 002-frontend-app | **Date**: 2026-01-10 | **Status**: Complete

## Overview

This document defines the frontend data models that will be used in the Next.js application. These models represent the client-side state and data structures that correspond to backend entities but are optimized for UI rendering and state management.

## Frontend-Specific Data Models

### 1. User Session Model

**Purpose**: Represents an authenticated user's session state in the frontend application

**Type Definition**:
```typescript
interface UserSession {
  id: string;              // User's unique identifier from backend
  email: string;           // User's email address
  token: string;           // JWT token for API authentication
  expiresAt: Date;         // Token expiration time
  isAuthenticated: boolean; // Authentication status flag
  isLoading: boolean;      // Loading state during auth operations
  error?: string;          // Error message if authentication failed
}
```

**Usage Context**:
- Managed by Auth Context Provider
- Used for conditional rendering of protected routes
- Automatically attached to API requests
- Updated when user signs in/out

### 2. Task Model (Frontend)

**Purpose**: Represents a task entity optimized for frontend rendering and state management

**Type Definition**:
```typescript
interface FrontendTask {
  id: string;              // Unique task identifier
  title: string;           // Task title
  description?: string;    // Optional task details
  completed: boolean;      // Completion status
  createdAt: Date;         // Creation timestamp
  updatedAt: Date;         // Last update timestamp
  isEditing?: boolean;     // UI state for inline editing
  isSaving?: boolean;      // Loading state during save operations
  error?: string;          // Error message if save failed
}
```

**Usage Context**:
- Used in task list components
- Maintains UI state during editing operations
- Transforms backend API responses for UI consumption
- Converted to backend-compatible format for API requests

### 3. API Client State Model

**Purpose**: Represents the state of API communications for UI feedback

**Type Definition**:
```typescript
interface ApiState<T = any> {
  data?: T;                // Response data
  isLoading: boolean;      // Request in progress
  isError: boolean;        // Request failed
  isSuccess: boolean;      // Request completed successfully
  error?: string;          // Error message
  lastUpdated?: Date;      // Last successful update time
}
```

**Usage Context**:
- Used across all API client operations
- Provides consistent loading/error states to UI components
- Enables optimistic updates
- Facilitates retry mechanisms

### 4. Form State Model

**Purpose**: Manages form state and validation for user input

**Type Definition**:
```typescript
interface FormState<T> {
  values: T;               // Current form values
  errors: Record<string, string>; // Field-specific error messages
  isValid: boolean;        // Overall form validity
  isSubmitting: boolean;   // Submission in progress
  submitSuccess?: boolean; // Submission completed successfully
  submitError?: string;    // Submission error message
}
```

**Usage Context**:
- Used in authentication forms (login, register)
- Applied to task creation/edit forms
- Provides real-time validation feedback
- Manages form submission states

## Context State Models

### 5. Task List State Model

**Purpose**: Manages the state of the task list UI component

**Type Definition**:
```typescript
interface TaskListState {
  tasks: FrontendTask[];           // List of tasks
  filteredTasks: FrontendTask[];   // Filtered task list
  filter: 'all' | 'active' | 'completed'; // Current filter
  sortBy: 'createdAt' | 'updatedAt' | 'title'; // Sort criteria
  sortOrder: 'asc' | 'desc';      // Sort direction
  searchQuery: string;            // Search filter
  isLoading: boolean;             // Loading state
  error?: string;                 // Error state
  hasMore?: boolean;              // Pagination indicator
}
```

**Usage Context**:
- Managed by Task Context Provider
- Used in task list component
- Handles filtering, sorting, and searching
- Maintains UI state across component boundaries

### 6. UI State Model

**Purpose**: Manages general UI states not specific to data entities

**Type Definition**:
```typescript
interface UIState {
  isMobile: boolean;              // Mobile view detection
  isDarkMode: boolean;            // Theme preference
  showSidebar: boolean;           // Sidebar visibility
  notifications: Notification[];  // Active notifications
  globalLoading: boolean;         // Global loading state
  currentView: 'list' | 'grid' | 'detail'; // Current view mode
}
```

**Usage Context**:
- Managed by UI Context Provider
- Controls responsive behavior
- Maintains user preferences
- Coordinates global UI states

## API Response Transformation Models

### 7. Backend to Frontend Task Mapper

**Purpose**: Converts backend API task responses to frontend-optimized format

**Transformation Function**:
```typescript
interface TaskApiMapper {
  toFrontendTask(backendTask: BackendTask): FrontendTask;
  toBackendTask(frontendTask: FrontendTask): BackendTask;
  toFrontendTaskList(backendTasks: BackendTask[]): FrontendTask[];
}
```

**Fields Mapping**:
- `id`: Direct mapping
- `title`: Direct mapping
- `description`: Direct mapping
- `completed`: Direct mapping
- `created_at` → `createdAt` (ISO string to Date)
- `updated_at` → `updatedAt` (ISO string to Date)

### 8. Error Response Model

**Purpose**: Standardized error response format for UI consumption

**Type Definition**:
```typescript
interface FrontendError {
  message: string;          // User-friendly error message
  code: string;            // Error code for categorization
  field?: string;          // Field-specific error (optional)
  status: number;          // HTTP status code
  timestamp: Date;         // Error occurrence time
  retryable: boolean;      // Whether the operation can be retried
}
```

**Usage Context**:
- Converts backend error responses to UI-friendly format
- Enables appropriate error handling strategies
- Provides user feedback for different error types

## Validation Models

### 9. Validation Rules Model

**Purpose**: Defines validation rules for frontend data

**Type Definition**:
```typescript
interface ValidationRule {
  field: string;           // Field to validate
  validator: (value: any) => boolean; // Validation function
  message: string;         // Error message if validation fails
  condition?: () => boolean; // Conditional validation
}

interface ValidationSchema {
  [entity: string]: ValidationRule[];
}
```

**Usage Context**:
- Applied to form inputs
- Used for real-time validation
- Provides consistent validation across the application

## Component State Models

### 10. Modal State Model

**Purpose**: Manages modal component states

**Type Definition**:
```typescript
interface ModalState {
  isOpen: boolean;         // Modal visibility
  type: 'confirm' | 'alert' | 'form' | 'info'; // Modal type
  title: string;           // Modal title
  content: string | React.ReactNode; // Modal content
  onConfirm?: () => void;  // Confirm action
  onCancel?: () => void;   // Cancel action
  confirmText?: string;    // Confirm button text
  cancelText?: string;     // Cancel button text
}
```

**Usage Context**:
- Controls modal component behavior
- Manages user confirmation flows
- Provides consistent modal experience

## Performance and Caching Models

### 11. Cache Entry Model

**Purpose**: Represents cached API responses for performance optimization

**Type Definition**:
```typescript
interface CacheEntry<T> {
  data: T;                 // Cached data
  timestamp: Date;         // Cache creation time
  ttl: number;             // Time-to-live in milliseconds
  isValid: boolean;        // Cache validity status
  etag?: string;           // Cache validation token (if applicable)
}
```

**Usage Context**:
- Implements client-side caching strategy
- Reduces API request frequency
- Improves perceived performance

## Integration with Backend Models

### Mapping to Backend Entities

The frontend data models align with backend entities as follows:

**Backend User Entity** ↔ **Frontend UserSession**
- Backend: `id`, `email`, `created_at`, `updated_at`
- Frontend: Additional fields for UI state (`token`, `isAuthenticated`, `isLoading`)

**Backend Task Entity** ↔ **FrontendTask**
- Backend: `id`, `title`, `description`, `completed`, `user_id`, `created_at`, `updated_at`
- Frontend: Additional UI state fields (`isEditing`, `isSaving`)

## Type Safety and TypeScript Benefits

All models are strongly typed using TypeScript interfaces to provide:
- Compile-time type checking
- Better IDE autocompletion
- Clear API contracts between components
- Reduced runtime errors
- Improved maintainability

## Testing Considerations

The data models are designed to support:
- Easy mocking in unit tests
- Clear state transitions for testing
- Predictable data transformations
- Consistent error handling patterns