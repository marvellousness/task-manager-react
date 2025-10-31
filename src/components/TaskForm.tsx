import { useState } from "react";
import { Plus } from "lucide-react";
import type { Task } from "../types/task";

export function TaskForm({onAddTask,}: {
  onAddTask: (title: string, priority: Task["priority"]) => void;
}) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [showPriority, setShowPriority] = useState(false);

  const handleSubmit = () => {
    if (title.trim()) {
      onAddTask(title.trim(), priority);
      setTitle("");
      setPriority("medium");
      setShowPriority(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const priorityColors = {
    low: "bg-green-100 text-green-700 hover:bg-green-200",
    medium: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    high: "bg-red-100 text-red-700 hover:bg-red-200",
  };

  return (
    <div className="mb-6">
      <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-4 transition-all focus-within:border-indigo-300 focus-within:shadow-md">
        <div className="flex gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setShowPriority(true)}
            onKeyDown={handleKeyDown}
            placeholder="What do you need to do?"
            className="flex-1 text-lg outline-none placeholder:text-gray-400"
          />
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 
                     disabled:bg-gray-300 disabled:cursor-not-allowed transition-all active:scale-95
                     flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {showPriority && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-500 py-1">Priority:</span>
            {(["low", "medium", "high"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  priority === p
                    ? priorityColors[p]
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
