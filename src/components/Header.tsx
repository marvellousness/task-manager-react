export function Header({counts}: {
  counts: { all: number; active: number; completed: number };
}) {
  const completionRate =
    counts.all > 0 ? Math.round((counts.completed / counts.all) * 100) : 0;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">My Tasks</h1>
          <p className="text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-indigo-600">
            {completionRate}%
          </div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
      </div>

      {counts.all > 0 && (
        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      )}
    </div>
  );
}
