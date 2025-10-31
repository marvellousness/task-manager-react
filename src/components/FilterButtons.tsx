import type { FilterType } from '../types/FilterType';

import { Circle, CheckCircle2, Clock} from 'lucide-react';


export function FilterButtons({ currentFilter, onFilterChange, counts }: {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: { all: number; active: number; completed: number };
}) {
  const filters: { label: string; value: FilterType; count: number; icon: React.ReactNode }[] = [
    { label: 'All', value: 'all', count: counts.all, icon: <Circle className="w-4 h-4" /> },
    { label: 'Active', value: 'active', count: counts.active, icon: <Clock className="w-4 h-4" /> },
    { label: 'Done', value: 'completed', count: counts.completed, icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {filters.map(({ label, value, count, icon }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            currentFilter === value
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-100'
          }`}
        >
          {icon}
          <span>{label}</span>
          <span className={`text-sm px-2 py-0.5 rounded-full ${
            currentFilter === value ? 'bg-white/20' : 'bg-gray-100'
          }`}>
            {count}
          </span>
        </button>
      ))}
    </div>
  );
}