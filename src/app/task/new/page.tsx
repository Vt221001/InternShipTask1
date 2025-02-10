"use client";
import TaskForm from "@/components/TaskForm";

export default function NewTaskPage() {
  return (
    <div className="bg-gray-300 text-white min-h-screen flex flex-col justify-center items-center p-6">
      <div className="bg-gray-50 text-black p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Create New Task
        </h1>
        <TaskForm />
      </div>
    </div>
  );
}
