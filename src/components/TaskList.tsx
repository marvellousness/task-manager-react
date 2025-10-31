import type { Task } from '../types/task';
import TaskItem from './TaskItem';
import { ListTodo } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <ListTodo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-400 text-lg">No tasks yet</p>
        <p className="text-gray-300 text-sm mt-1">Add one above to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}