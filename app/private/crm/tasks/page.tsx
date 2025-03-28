"use client"
import React, { useEffect, useState } from "react";

interface Task {
  id: number;
  to_do: string | null;
  date_to_do: string;
  hour: string;
  user_id: number | null;
  done: boolean | null;
  date_done: string | null;
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p className="text-center p-4">Loading tasks...</p>;
  if (error) return <p className="text-center p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse text-left text-gray-700">
          <thead>
            <tr className="bg-gray-200 text-gray-800 uppercase text-sm">
              <th className="p-3">ID</th>
              <th className="p-3">Task</th>
              <th className="p-3">Date to Do</th>
              <th className="p-3">Hour</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date Done</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="border-b hover:bg-gray-100 transition-all">
                  <td className="p-3">{task.id}</td>
                  <td className="p-3">{task.to_do || "-"}</td>
                  <td className="p-3">{task.date_to_do}</td>
                  <td className="p-3">{task.hour}</td>
                  <td className="p-3">{task.user_id ?? "-"}</td>
                  <td className="p-3">
                    {task.done ? (
                      <span className="text-green-600 font-semibold">Done</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="p-3">{task.date_done || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
