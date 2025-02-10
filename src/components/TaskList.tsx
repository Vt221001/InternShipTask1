"use client";
import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "@/app/api/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await getTasks();
        if (data?.tasks && Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    }
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      await updateTask(id, { completed: !completed });
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, completed: !completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center w-full max-w-5xl mx-auto">
      <Link href="/task/new">
        <button className="px-4 py-2 bg-blue-500 text-white rounded mb-6">
          + Add Task
        </button>
      </Link>

      {!Array.isArray(tasks) || tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border p-4 rounded-lg shadow-lg bg-white w-[300px] flex flex-col justify-between min-h-[180px] max-h-[300px] overflow-hidden"
            >
              <div className="flex-grow overflow-hidden">
                <h2 className="text-xl font-semibold break-words overflow-hidden text-ellipsis">
                  {task.title}
                </h2>
                <p className="text-gray-700 break-words overflow-hidden text-ellipsis">
                  {task.description}
                </p>
                <p className="text-sm text-gray-500">
                  Due Date: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-between items-center gap-2 mt-4">
                <button
                  className={`flex-1 px-3 py-2 text-white rounded text-sm ${
                    task.completed ? "bg-green-500" : "bg-gray-500"
                  }`}
                  onClick={() => toggleComplete(task._id, task.completed)}
                >
                  {task.completed ? "Incomplete" : "Mark"}
                </button>
                <Link href={`/task/${task._id}`} className="flex-1">
                  <button className="w-full px-3 py-2 bg-yellow-500 text-white rounded text-sm">
                    Edit
                  </button>
                </Link>
                <button
                  className="flex-1 px-3 py-2 bg-red-500 text-white rounded text-sm"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
