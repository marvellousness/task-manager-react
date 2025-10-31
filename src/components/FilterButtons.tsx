import type { FilterType } from '../types/task';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export default function FilterButtons({
  currentFilter,
  onFilterChange,
  counts,
}: FilterButtonsProps) {
  const filters: { label: string; value: FilterType; count: number }[] = [
    { label: 'All', value: 'all', count: counts.all },
    { label: 'Active', value: 'active', count: counts.active },
    { label: 'Completed', value: 'completed', count: counts.completed },
  ];

  return (
    <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
      {filters.map(({ label, value, count }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200
                    ${currentFilter === value
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
        >
          <span>{label}</span>
          <span className={`ml-2 text-sm ${
            currentFilter === value ? 'text-indigo-400' : 'text-gray-400'
          }`}>
            ({count})
          </span>
        </button>
      ))}
    </div>
  );
}