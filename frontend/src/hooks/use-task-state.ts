import { useState, useEffect } from 'react';
import { Task, CreateTaskData, UpdateTaskData } from '../lib/types';
import taskCrudService from '../services/task-crud-service';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  selectedTask: Task | null;
  loadingStates: {
    fetch: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    toggle: boolean;
  };
}

export const useTaskState = () => {
  const [state, setState] = useState<TaskState>({
    tasks: [],
    loading: false,
    error: null,
    selectedTask: null,
    loadingStates: {
      fetch: false,
      create: false,
      update: false,
      delete: false,
      toggle: false,
    },
  });

  // Fetch all tasks
  const fetchTasks = async () => {
    setState(prev => ({
      ...prev,
      loading: true,
      loadingStates: { ...prev.loadingStates, fetch: true },
      error: null,
    }));

    const result = await taskCrudService.getAllTasks();

    setState(prev => ({
      ...prev,
      loading: false,
      loadingStates: { ...prev.loadingStates, fetch: false },
      tasks: result.success ? result.tasks || [] : prev.tasks,
      error: result.success ? null : result.error || 'Unknown error',
    }));
  };

  // Create a new task with optimistic update
  const createTask = async (taskData: CreateTaskData) => {
    // Generate temporary ID for optimistic update
    const tempId = `temp-${Date.now()}`;

    // Optimistically add the task to the list
    setState(prev => ({
      ...prev,
      tasks: [
        ...prev.tasks,
        {
          id: tempId,
          title: taskData.title,
          description: taskData.description,
          completed: taskData.completed || false,
          userId: 'temp', // Will be updated with real user ID later
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isSaving: true, // Mark as saving for UI feedback
        },
        ...prev.tasks,
      ],
      loadingStates: { ...prev.loadingStates, create: true },
      error: null,
    }));

    try {
      const result = await taskCrudService.createTask(taskData);

      if (result.success && result.task) {
        // Update with the server-generated task
        setState(prev => ({
          ...prev,
          tasks: prev.tasks.map(task =>
            task.id === tempId ? { ...result.task!, isSaving: false } : task
          ),
          loadingStates: { ...prev.loadingStates, create: false },
        }));
      } else {
        // Remove the temporary task if creation failed
        setState(prev => ({
          ...prev,
          tasks: prev.tasks.filter(task => task.id !== tempId),
          loadingStates: { ...prev.loadingStates, create: false },
          error: result.error || 'Failed to create task',
        }));
      }
    } catch (error) {
      // Remove the temporary task if an error occurred
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.filter(task => task.id !== tempId),
        loadingStates: { ...prev.loadingStates, create: false },
        error: 'Network error occurred while creating task',
      }));
    }
  };

  // Update an existing task with optimistic update
  const updateTask = async (id: string, taskData: UpdateTaskData) => {
    // Optimistically update the task
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === id ? { ...task, ...taskData, isSaving: true } : task
      ),
      loadingStates: { ...prev.loadingStates, update: true },
      error: null,
    }));

    try {
      const result = await taskCrudService.updateTask(id, taskData);

      if (result.success && result.task) {
        // Update with the server response
        setState(prev => ({
          ...prev,
          tasks: prev.tasks.map(task =>
            task.id === id ? { ...result.task!, isSaving: false } : task
          ),
          loadingStates: { ...prev.loadingStates, update: false },
        }));
      } else {
        // Revert to original state if update failed
        const originalTask = state.tasks.find(task => task.id === id);
        if (originalTask) {
          setState(prev => ({
            ...prev,
            tasks: prev.tasks.map(task =>
              task.id === id ? { ...originalTask, isSaving: false } : task
            ),
            loadingStates: { ...prev.loadingStates, update: false },
            error: result.error || 'Failed to update task',
          }));
        }
      }
    } catch (error) {
      // Revert to original state if an error occurred
      const originalTask = state.tasks.find(task => task.id === id);
      if (originalTask) {
        setState(prev => ({
          ...prev,
          tasks: prev.tasks.map(task =>
            task.id === id ? { ...originalTask, isSaving: false } : task
          ),
          loadingStates: { ...prev.loadingStates, update: false },
          error: 'Network error occurred while updating task',
        }));
      }
    }
  };

  // Delete a task with optimistic update
  const deleteTask = async (id: string) => {
    // Find the task to be deleted for potential revert
    const taskToDelete = state.tasks.find(task => task.id === id);

    // Optimistically remove the task
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== id),
      loadingStates: { ...prev.loadingStates, delete: true },
      error: null,
    }));

    try {
      const result = await taskCrudService.deleteTask(id);

      if (!result.success) {
        // Restore the task if deletion failed
        if (taskToDelete) {
          setState(prev => ({
            ...prev,
            tasks: [...prev.tasks, taskToDelete],
            loadingStates: { ...prev.loadingStates, delete: false },
            error: result.error || 'Failed to delete task',
          }));
        }
      } else {
        // Success - keep the task deleted
        setState(prev => ({
          ...prev,
          loadingStates: { ...prev.loadingStates, delete: false },
        }));
      }
    } catch (error) {
      // Restore the task if an error occurred
      if (taskToDelete) {
        setState(prev => ({
          ...prev,
          tasks: [...prev.tasks, taskToDelete],
          loadingStates: { ...prev.loadingStates, delete: false },
          error: 'Network error occurred while deleting task',
        }));
      }
    }
  };

  // Toggle task completion with optimistic update
  const toggleTaskCompletion = async (id: string, completed: boolean) => {
    // Optimistically update the completion status
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === id ? { ...task, completed, isSaving: true } : task
      ),
      loadingStates: { ...prev.loadingStates, toggle: true },
      error: null,
    }));

    try {
      const result = await taskCrudService.toggleTaskCompletion(id, completed);

      if (result.success && result.task) {
        // Update with the server response
        setState(prev => ({
          ...prev,
          tasks: prev.tasks.map(task =>
            task.id === id ? { ...result.task!, isSaving: false } : task
          ),
          loadingStates: { ...prev.loadingStates, toggle: false },
        }));
      } else {
        // Revert the completion status if update failed
        setState(prev => ({
          ...prev,
          tasks: prev.tasks.map(task =>
            task.id === id ? { ...task, completed: !completed, isSaving: false } : task
          ),
          loadingStates: { ...prev.loadingStates, toggle: false },
          error: result.error || 'Failed to update task status',
        }));
      }
    } catch (error) {
      // Revert the completion status if an error occurred
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.map(task =>
          task.id === id ? { ...task, completed: !completed, isSaving: false } : task
        ),
        loadingStates: { ...prev.loadingStates, toggle: false },
        error: 'Network error occurred while updating task status',
      }));
    }
  };

  // Select a task for detail view
  const selectTask = (task: Task | null) => {
    setState(prev => ({
      ...prev,
      selectedTask: task,
    }));
  };

  return {
    ...state,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    selectTask,
  };
};