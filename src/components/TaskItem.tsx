import type { Task } from "../types/task";
import { Trash2, Check } from "lucide-react";

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;    
    onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="group task-item-enter">
      <div className={`flex items-center gap-4 p-4 bg-white rounded-xl border-2 
                    transition-all duration-200 hover:shadow-md hover:border-indigo-200
                    ${task.completed ? 'border-gray-200 bg-gray-50' : 'border-gray-200'}`}>
        
        {/* Custom Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-200
                    flex items-center justify-center
                    ${task.completed 
                      ? 'bg-indigo-600 border-indigo-600' 
                      : 'border-gray-300 hover:border-indigo-400'}`}
        >
          {task.completed && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
        </button>

        {/* Task Title */}
        <span
          className={`flex-1 text-lg transition-all duration-200 ${
            task.completed 
              ? 'line-through text-gray-400' 
              : 'text-gray-800'
          }`}
        >
          {task.title}
        </span>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 
                   rounded-lg transition-all duration-200 active:scale-95"
          aria-label="Delete task"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}