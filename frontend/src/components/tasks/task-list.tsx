'use client';

import React, { useState, useEffect } from 'react';
import { Task, TaskFilters } from '../../lib/types';
import { TaskItem } from './task-item';
import { TaskForm } from './task-form';

interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  error?: string;
  onAddTask: (taskData: { title: string; description?: string }) => void;
  onUpdateTask: (id: string, taskData: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string, completed: boolean) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading = false,
  error,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleTask,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const filteredTasks = tasks.filter(task => {
    if (filters.status === 'active') return !task.completed;
    if (filters.status === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let aValue: string | boolean;
    let bValue: string | boolean;

    switch (filters.sortBy) {
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

    if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleAddTask = (taskData: { title: string; description?: string }) => {
    onAddTask(taskData);
    setShowForm(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleUpdateTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
      setEditingTask(null);
      setShowForm(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const handleFilterChange = (filterType: keyof TaskFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full sm:w-auto text-center"
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          Error: {error}
        </div>
      )}

      {showForm && (
        <div className="mb-6">
          <TaskForm
            task={editingTask || undefined}
            onSubmit={editingTask ? handleUpdateTask : handleAddTask}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value as 'all' | 'active' | 'completed')}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sort-by"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value as 'createdAt' | 'updatedAt' | 'title')}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="createdAt">Created Date</option>
            <option value="updatedAt">Updated Date</option>
            <option value="title">Title</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 mb-1">
            Order
          </label>
          <select
            id="sort-order"
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : sortedTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found. Add a new task to get started.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => handleEditTask(task)}
              onDelete={onDeleteTask}
              onToggle={() => onToggleTask(task.id, !task.completed)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};