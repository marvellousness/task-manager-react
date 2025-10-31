import { useState, useEffect } from "react";
import type { Task, FilterType } from "./types/task";
import { loadTasks, saveTasks } from "./utils/localStorage";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  // Load tasks on mount
  useEffect(() => {
    const loaded = loadTasks();
    setTasks(loaded);
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
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

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Calculate counts
  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Header />

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <TaskForm onAddTask={addTask} />

          <FilterButtons
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </div>

        {/* Footer Stats */}
        {tasks.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500 animate-fade-in">
            {counts.active === 0 ? (
              <span className="text-green-600 font-medium">
                🎉 All tasks completed!
              </span>
            ) : (
              <span>
                {counts.active} task{counts.active !== 1 ? "s" : ""} remaining
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
