"use client";
import TaskList from "@/components/TaskList";

export default function TasksPage() {
  return (
    <div className="p-6 flex flex-col items-center bg-gray-300 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      <div className="w-full max-w-2xl flex justify-center items-center">
        <TaskList />
      </div>
    </div>
  );
}
