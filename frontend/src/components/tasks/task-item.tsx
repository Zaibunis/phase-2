import React from 'react';
import { Task } from '../tasks/task-detail';

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onToggle: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <li className="bg-white shadow rounded-lg p-4 border border-gray-200">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={`task-${task.id}`}
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
            className="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded cursor-pointer"
          />
        </div>
        <div className="ml-3 min-w-0 flex-1">
          <label
            htmlFor={`task-${task.id}`}
            className={`text-sm font-medium ${
              task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}
          >
            {task.title}
          </label>
          {task.description && (
            <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
              {task.description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              onClick={onEdit}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 px-3 py-1.5 rounded-md hover:bg-indigo-50 min-w-[60px] text-center"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-sm font-medium text-red-600 hover:text-red-500 px-3 py-1.5 rounded-md hover:bg-red-50 min-w-[60px] text-center"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Created: {new Date(task.createdAt).toLocaleDateString()}
        {task.updatedAt !== task.createdAt && (
          <span>, Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
        )}
      </div>
    </li>
  );
};