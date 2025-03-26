import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Task, FilterType } from "../types/taskTypes";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList: React.FC = React.memo(() => {
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {showForm ? (
        <TaskForm taskToEdit={editingTask} onCancel={handleCancel} />
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add New Task
        </button>
      )}

      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No tasks found</p>
      ) : (
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={handleEdit} />
          ))}
        </div>
      )}
    </div>
  );
});

export default TaskList;
