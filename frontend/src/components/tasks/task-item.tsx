import React from 'react';
import { Task } from '../../lib/types';

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onToggle: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <li className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 group">
      <div className="flex items-start gap-4">
        <div className="flex items-center h-6 pt-1">
          <input
            id={`task-${task.id}`}
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
            className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer transition-all duration-200"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <label
                htmlFor={`task-${task.id}`}
                className={`text-lg font-medium block ${
                  task.completed
                    ? 'text-gray-500 line-through decoration-gray-500/50'
                    : 'text-white'
                }`}
              >
                {task.title}
              </label>
              {task.description && (
                <p className={`mt-2 text-gray-400 ${task.completed ? 'opacity-70' : ''}`}>
                  {task.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={onEdit}
                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                title="Edit task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                title="Delete task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                task.completed
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  task.completed ? 'bg-green-400' : 'bg-yellow-400'
                }`}></span>
                {task.completed ? 'Completed' : 'Pending'}
              </span>

              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {task.updatedAt !== task.createdAt && (
              <div className="flex items-center gap-1 text-gray-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};