import type { Task } from "./types/task";
import { useState, useEffect, useMemo } from "react";
import { FilterButtons } from "./components/FilterButtons";
import { loadTasks, saveTasks } from "./utils/localStorage";
import { TaskForm } from "./components/TaskForm";
import { EmptyState } from "./components/EmptyState";
import { TaskItem } from "./components/TaskItem";
import { Header } from "./components/Header";
import type { FilterType } from "./types/FilterType";

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string, priority: Task["priority"], description?: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
      priority,
      description: description?.trim() || undefined,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  // --- Grouping helpers ---
  const getDateKey = (timestamp: number) => {
    // returns YYYY-MM-DD so groups can be sorted lexicographically
    return new Date(timestamp).toISOString().slice(0, 10);
  };

  const formatGroupLabel = (dateKey: string) => {
    const date = new Date(dateKey);
    const today = new Date();
    const todayKey = getDateKey(today.getTime());
    const yesterdayKey = getDateKey(Date.now() - 24 * 60 * 60 * 1000);

    if (dateKey === todayKey) return "Today";
    if (dateKey === yesterdayKey) return "Yesterday";

    // show short month + day, include year only if different from current year
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() === today.getFullYear() ? undefined : "numeric",
    });
  };

  const groupedByDate = useMemo(() => {
    const groups: Record<string, Task[]> = {};
    for (const task of filteredTasks) {
      const key = getDateKey(task.createdAt);
      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
    }

    // sort tasks inside a group newest-first
    for (const k of Object.keys(groups)) {
      groups[k].sort((a, b) => b.createdAt - a.createdAt);
    }

    // create an array of groups sorted by date descending
    const sortedKeys = Object.keys(groups).sort((a, b) => (a < b ? 1 : -1));
    return sortedKeys.map((key) => ({ dateKey: key, tasks: groups[key] }));
  }, [filteredTasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Header counts={counts} />

        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-8">
          <TaskForm onAddTask={addTask} />
          <FilterButtons
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />

          <div className="space-y-6">
            {filteredTasks.length === 0 ? (
              <EmptyState filter={filter} />
            ) : (
              groupedByDate.map((group) => (
                <div key={group.dateKey}>
                  <div className="mb-3 px-2 text-sm text-gray-500">
                    {formatGroupLabel(group.dateKey)}
                  </div>
                  <div className="space-y-3">
                    {group.tasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onEdit={editTask}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {tasks.length > 0 && (
          <div className="mt-6 flex justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              <span>{counts.active} active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>{counts.completed} completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span>{counts.all} total</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
