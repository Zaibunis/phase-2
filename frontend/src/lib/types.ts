// Task-related types
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface CreateTaskData {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  completed?: boolean;
}

// User-related types
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    message: string;
    code: string;
    details?: Array<{ field: string; message: string }>;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// Authentication-related types
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// UI state types
export interface TaskFilters {
  status: 'all' | 'active' | 'completed';
  sortBy: 'createdAt' | 'updatedAt' | 'title';
  sortOrder: 'asc' | 'desc';
  searchQuery?: string;
}

export interface TaskUiState extends Task {
  isEditing?: boolean;
  isSaving?: boolean;
  error?: string;
}

export interface TaskListState {
  tasks: TaskUiState[];
  filteredTasks: TaskUiState[];
  filters: TaskFilters;
  isLoading: boolean;
  error?: string;
  hasMore?: boolean;
}