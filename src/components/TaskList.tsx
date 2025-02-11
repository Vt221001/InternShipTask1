"use client";
import { useState } from "react";
import { deleteTask, updateTask } from "@/app/api/api";
import Link from "next/link";
import toast from "react-hot-toast";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskList({ tasks, setTasks }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);

  const confirmDelete = (task: Task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedTask) return;
    try {
      await deleteTask(selectedTask._id);
      setTasks((prev) => prev.filter((task) => task._id !== selectedTask._id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task.");
      console.error("Error deleting task:", error);
    } finally {
      setShowModal(false);
      setSelectedTask(null);
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
      toast.success(
        `Task marked as ${!completed ? "Completed" : "Incomplete"}`
      );
    } catch (error) {
      toast.error("Error updating task.");
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
                  onClick={() => confirmDelete(task)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold text-black">
              Are you sure you want to delete this task?
            </h3>
            <p className="text-gray-700 mt-2">{selectedTask.title}</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
