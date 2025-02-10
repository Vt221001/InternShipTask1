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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Task</h1>
      <TaskForm taskId={id} />
    </div>
  );
}
