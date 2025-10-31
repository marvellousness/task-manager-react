import { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-6 py-4 pr-14 text-lg border-2 border-gray-200 rounded-2xl 
                   focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 
                   transition-all duration-200 placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white 
                   rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!title.trim()}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
}