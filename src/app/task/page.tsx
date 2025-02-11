"use client";
import { useEffect, useState } from "react";
import TaskList from "@/components/TaskList";
import { getTasks } from "@/app/api/api";
import { HashLoader } from "react-spinners";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
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
      } finally {
        setLoading(false);
      }
    }, 2000);
  }, []);

  return (
    <div className="p-6 flex flex-col items-center bg-gray-300 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <HashLoader color="#2563eb" size={80} />
        </div>
      ) : (
        <div className="w-full max-w-2xl flex justify-center items-center">
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
      )}
    </div>
  );
}
