import type { FilterType } from "../types/FilterType";
import { CheckCircle2 } from 'lucide-react';

export function EmptyState({ filter }: { filter: FilterType }) {
  const messages = {
    all: { title: "No tasks yet", subtitle: "Add your first task above to get started!" },
    active: { title: "All caught up!", subtitle: "No active tasks. Time to relax! 🎉" },
    completed: { title: "No completed tasks", subtitle: "Start checking off some tasks!" },
  };

  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-10 h-10 text-indigo-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{messages[filter].title}</h3>
      <p className="text-gray-400">{messages[filter].subtitle}</p>
    </div>
  );
}