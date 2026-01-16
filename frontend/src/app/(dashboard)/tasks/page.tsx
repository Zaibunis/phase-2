'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../lib/hooks/useAuth';
import { Task, CreateTaskData, UpdateTaskData } from '../../../lib/types';
import { TaskList } from '../../../components/tasks/task-list';

const TasksPage = () => {
  const { user} = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks for the authenticated user
  useEffect(() => {
    if (user?.id) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would fetch from the API
      // For now, we'll simulate with an empty array
      setTasks([]);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData: CreateTaskData) => {
    try {
      // In a real implementation, this would call the API to create a task
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed ?? false,
        userId: user!.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError('Failed to add task');
      console.error('Error adding task:', err);
    }
  };

  const updateTask = async (id: string, taskData: UpdateTaskData) => {
    try {
      // In a real implementation, this would call the API to update a task
      setTasks(prev => prev.map(task =>
        task.id === id
          ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
          : task
      ));
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      // In a real implementation, this would call the API to delete a task
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      // In a real implementation, this would call the API to toggle task completion
      setTasks(prev => prev.map(task =>
        task.id === id
          ? { ...task, completed, updatedAt: new Date().toISOString() }
          : task
      ));
    } catch (err) {
      setError('Failed to toggle task');
      console.error('Error toggling task:', err);
    }
  };


  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            TaskFlow Pro
          </h1>
          <p className="text-xl text-gray-300">Please sign in to view your tasks</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">✓</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              My Tasks
            </h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Organize your workflow and boost productivity with TaskFlow Pro. Create, manage, and accomplish your goals efficiently.
          </p>
        </div>

        <TaskList
          tasks={tasks}
          loading={loading}
          error={error ?? undefined}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onToggleTask={toggleTask}
        />
      </div>
    </div>
  );
};

export default TasksPage;