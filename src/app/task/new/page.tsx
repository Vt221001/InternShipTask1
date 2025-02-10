"use client";
import TaskForm from "@/components/TaskForm";

export default function NewTaskPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Create New Task</h1>
      <TaskForm />
    </div>
  );
}
