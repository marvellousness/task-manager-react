import { CheckCircle2 } from "lucide-react";

export default function Header() {
    return (
      <div className="text-center mb-8 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-2">
          <CheckCircle2 className="w-10 h-10 text-indigo-600" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            TaskFlow
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Organize your day, accomplish your goals
        </p>
      </div>
    );
}