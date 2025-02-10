"use client";
import { useState, useEffect } from "react";
import { createTask, updateTask, getTaskById } from "@/app/api/api";
import { useRouter } from "next/navigation";

interface Task {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
}

export default function TaskForm({ taskId }: { taskId?: string }) {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (taskId) {
      async function fetchTask() {
        setLoading(true);
        try {
          const data = await getTaskById(taskId!);

          const formattedDate = data.dueDate
            ? new Date(data.dueDate).toISOString().split("T")[0]
            : "";

          setTask({ ...data, dueDate: formattedDate });
        } catch (error) {
          setError("Failed to fetch task.");
          console.error("Error fetching task:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchTask();
    }
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (taskId) {
        await updateTask(taskId, task);
      } else {
        await createTask(task);
      }
      router.push("/task");
    } catch (error) {
      setError("Error submitting task.");
      console.error("Error submitting task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded-md shadow  w-[600px]"
      >
        <h2 className="text-xl font-bold text-black mb-4">
          {taskId ? "Edit Task" : "New Task"}
        </h2>

        {loading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <input
          placeholder="due date"
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className={`px-4 py-2 rounded ${
              loading ? "bg-gray-400" : "bg-blue-500"
            } text-white`}
            disabled={loading}
          >
            {loading ? "Processing..." : taskId ? "Update Task" : "Create Task"}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded bg-red-500 text-white"
            onClick={() => router.push("/task")}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
