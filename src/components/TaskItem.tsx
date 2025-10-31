import type { Task } from "../types/task";
import { useState } from "react";
import { Trash2, Check, Calendar, Edit2 } from 'lucide-react';



const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  
  if (isToday) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export function TaskItem({ task, onToggle, onDelete, onEdit }: {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEdit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onEdit(task.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEdit();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(task.title);
    }
  };

  const priorityStyles = {
    low: 'border-l-green-400',
    medium: 'border-l-yellow-400',
    high: 'border-l-red-400',
  };

  return (
    <div className={`group bg-white rounded-xl border-2 border-gray-100 border-l-4 ${priorityStyles[task.priority || 'medium']} 
                    hover:shadow-md transition-all duration-200 ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3 p-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-lg border-2 transition-all duration-200
                    flex items-center justify-center ${
            task.completed
              ? 'bg-indigo-600 border-indigo-600'
              : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
          }`}
        >
          {task.completed && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={handleEdit}
                onKeyDown={handleKeyDown}
                autoFocus
                className="flex-1 px-2 py-1 border-2 border-indigo-300 rounded-lg outline-none"
              />
            </div>
          ) : (
            <>
              <div
                onDoubleClick={() => !task.completed && setIsEditing(true)}
                className={`text-lg cursor-text ${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {task.title}
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(task.createdAt)}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {!task.completed && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
              title="Edit task"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}