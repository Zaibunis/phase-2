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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">My Tasks</h2>
          <p className="text-gray-400">Manage your daily activities efficiently</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 w-full sm:w-auto text-center font-medium transition-all duration-200 transform hover:scale-105"
        >
          {showForm ? 'Cancel' : 'Add New Task'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 text-red-200 rounded-xl backdrop-blur-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Error: {error}
          </div>
        </div>
      )}

      {showForm && (
        <div className="mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <TaskForm
            task={editingTask || undefined}
            onSubmit={editingTask ? handleUpdateTask : handleAddTask}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Status
          </label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value as 'all' | 'active' | 'completed')}
            className="block w-full pl-4 pr-10 py-3 text-base bg-gray-800/70 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl appearance-none"
          >
            <option value="all" className="bg-gray-800">All Tasks</option>
            <option value="active" className="bg-gray-800">Active</option>
            <option value="completed" className="bg-gray-800">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort-by" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            Sort By
          </label>
          <select
            id="sort-by"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value as 'createdAt' | 'updatedAt' | 'title')}
            className="block w-full pl-4 pr-10 py-3 text-base bg-gray-800/70 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl appearance-none"
          >
            <option value="createdAt" className="bg-gray-800">Created Date</option>
            <option value="updatedAt" className="bg-gray-800">Updated Date</option>
            <option value="title" className="bg-gray-800">Title</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort-order" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Order
          </label>
          <select
            id="sort-order"
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
            className="block w-full pl-4 pr-10 py-3 text-base bg-gray-800/70 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl appearance-none"
          >
            <option value="desc" className="bg-gray-800">Descending</option>
            <option value="asc" className="bg-gray-800">Ascending</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="text-gray-400">
          Showing <span className="text-white font-medium">{sortedTasks.length}</span> of <span className="text-white font-medium">{tasks.length}</span> tasks
        </div>
        <div className="text-sm text-gray-500">
          {filters.status === 'active' && 'Showing active tasks only'}
          {filters.status === 'completed' && 'Showing completed tasks only'}
          {filters.status === 'all' && 'Showing all tasks'}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Loading your tasks...</p>
          </div>
        </div>
      ) : sortedTasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30">
          <div className="mx-auto w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-300 mb-2">No tasks yet</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first task</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 font-medium transition-all duration-200"
          >
            Create Your First Task
          </button>
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