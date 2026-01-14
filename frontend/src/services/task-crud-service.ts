import { Task, CreateTaskData, UpdateTaskData } from '../lib/types';
import taskService from './task-service';

/**
 * Task CRUD service that integrates with the API client
 */
export class TaskCrudService {
  /**
   * Get all tasks for the authenticated user
   */
  async getAllTasks(): Promise<{ success: boolean; tasks?: Task[]; error?: string }> {
    try {
      const response = await taskService.getAll();

      if (response.success && response.data) {
        return { success: true, tasks: response.data };
      } else {
        return { success: false, error: response.error?.message || 'Failed to fetch tasks' };
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred while fetching tasks' };
    }
  }

  /**
   * Get a specific task by ID
   */
  async getTaskById(id: string): Promise<{ success: boolean; task?: Task; error?: string }> {
    try {
      const response = await taskService.getById(id);

      if (response.success && response.data) {
        return { success: true, task: response.data };
      } else {
        return { success: false, error: response.error?.message || 'Failed to fetch task' };
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred while fetching task' };
    }
  }

  /**
   * Create a new task
   */
  async createTask(taskData: CreateTaskData): Promise<{ success: boolean; task?: Task; error?: string }> {
    try {
      const response = await taskService.create(taskData);

      if (response.success && response.data) {
        return { success: true, task: response.data };
      } else {
        return { success: false, error: response.error?.message || 'Failed to create task' };
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred while creating task' };
    }
  }

  /**
   * Update an existing task
   */
  async updateTask(id: string, taskData: UpdateTaskData): Promise<{ success: boolean; task?: Task; error?: string }> {
    try {
      const response = await taskService.update(id, taskData);

      if (response.success && response.data) {
        return { success: true, task: response.data };
      } else {
        return { success: false, error: response.error?.message || 'Failed to update task' };
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred while updating task' };
    }
  }

  /**
   * Delete a task
   */
  async deleteTask(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await taskService.deleteById(id);

      if (response.success) {
        return { success: true };
      } else {
        return { success: false, error: response.error?.message || 'Failed to delete task' };
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred while deleting task' };
    }
  }

  /**
   * Toggle task completion status
   */
  async toggleTaskCompletion(id: string, completed: boolean): Promise<{ success: boolean; task?: Task; error?: string }> {
    try {
      const response = await taskService.toggleCompletion(id, completed);

      if (response.success && response.data) {
        return { success: true, task: response.data };
      } else {
        return { success: false, error: response.error?.message || 'Failed to update task status' };
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred while updating task status' };
    }
  }
}

// Create a singleton instance
const taskCrudService = new TaskCrudService();

export default taskCrudService;