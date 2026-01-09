import { Task, TaskFilters } from './types';

/**
 * Utility functions for task filtering and sorting
 */

/**
 * Filter tasks based on the provided filters
 */
export const filterTasks = (tasks: Task[], filters: TaskFilters): Task[] => {
  return tasks.filter(task => {
    // Filter by completion status
    if (filters.status === 'active' && task.completed) {
      return false;
    }
    if (filters.status === 'completed' && !task.completed) {
      return false;
    }

    // Filter by search query if provided
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(query);
      const matchesDescription = task.description?.toLowerCase().includes(query);

      if (!matchesTitle && !matchesDescription) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Sort tasks based on the provided sort criteria
 */
export const sortTasks = (tasks: Task[], sortBy: TaskFilters['sortBy'], sortOrder: TaskFilters['sortOrder']): Task[] => {
  return [...tasks].sort((a, b) => {
    let aValue: string | boolean;
    let bValue: string | boolean;

    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'createdAt':
        aValue = a.createdAt;
        bValue = b.createdAt;
        break;
      case 'updatedAt':
        aValue = a.updatedAt;
        bValue = b.updatedAt;
        break;
      default:
        aValue = a.createdAt;
        bValue = b.createdAt;
    }

    // Handle comparison based on data type
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      if (!aValue && bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue && !bValue) return sortOrder === 'asc' ? 1 : -1;
    }

    return 0;
  });
};

/**
 * Apply both filtering and sorting to tasks
 */
export const processTasks = (tasks: Task[], filters: TaskFilters): Task[] => {
  let processedTasks = filterTasks(tasks, filters);
  processedTasks = sortTasks(processedTasks, filters.sortBy, filters.sortOrder);
  return processedTasks;
};

/**
 * Count tasks by status
 */
export const countTasksByStatus = (tasks: Task[]) => {
  return {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};