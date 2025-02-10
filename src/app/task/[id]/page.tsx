"use client";
import TaskForm from "@/components/TaskForm";
import { use } from "react";

export default function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div className="bg-gray-300 text-white min-h-screen flex flex-col justify-center items-center p-6">
      <div className="bg-white text-black p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">Edit Task</h1>
        <TaskForm taskId={id} />
      </div>
    </div>
  );
}
