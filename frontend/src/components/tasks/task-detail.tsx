import React, { useState } from 'react';
import { Task } from '../../lib/types';

interface TaskDetailProps {
  task: Task;
  onEdit: (taskData: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
  onBack: () => void;
}

export const TaskDetail: React.FC<TaskDetailProps> = ({ task, onEdit, onDelete, onToggle, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const handleSave = () => {
    onEdit({ title, description });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-4 text-indigo-600 hover:text-indigo-900 font-medium"
      >
        ← Back to Tasks
      </button>

      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        {isEditing ? (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Task</h2>
            <div className="mb-4">
              <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {task.title}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => onToggle(task.id, !task.completed)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    task.completed
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }`}
                >
                  {task.completed ? 'Completed' : 'Mark Complete'}
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium hover:bg-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm font-medium hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>

            {task.description && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
                <p className="text-gray-600">{task.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Created:</span>{' '}
                {new Date(task.createdAt).toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Updated:</span>{' '}
                {new Date(task.updatedAt).toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Status:</span>{' '}
                <span className={task.completed ? 'text-green-600' : 'text-yellow-600'}>
                  {task.completed ? 'Completed' : 'Active'}
                </span>
              </div>
              <div>
                <span className="font-medium">ID:</span> {task.id}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export type { Task };
