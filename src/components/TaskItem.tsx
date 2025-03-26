import React, { useState, useCallback } from "react";
import { Task } from "../types/taskTypes";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, toggleTask } from "../store/taskSlice";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RootState } from "../store";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = React.memo(({ task, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const { saveTasksToLocalStorage } = useLocalStorage();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const handleToggle = useCallback(() => {
    dispatch(toggleTask(task.id));
    saveTasksToLocalStorage(
      tasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  }, [dispatch, task.id, saveTasksToLocalStorage, tasks]);

  const handleDelete = useCallback(() => {
    dispatch(deleteTask(task.id));
    saveTasksToLocalStorage(tasks.filter((t) => t.id !== task.id));
  }, [dispatch, task.id, saveTasksToLocalStorage, tasks]);

  const handleEdit = useCallback(() => {
    onEdit(task);
  }, [onEdit, task]);

  return (
    <div
      className={`border rounded-lg p-4 mb-2 ${
        task.completed ? "bg-gray-100" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="h-5 w-5 mr-2"
          />
          <h3
            className={`text-lg font-medium ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-700"
          >
            {isExpanded ? "Less" : "More"}
          </button>
          <button
            onClick={handleEdit}
            className="text-yellow-500 hover:text-yellow-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-2 pl-7">
          <p className="text-gray-700 mb-2">{task.description}</p>
          <p className="text-sm text-gray-500">
            Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}
          </p>
          <p className="text-sm mt-1">
            Status: {task.completed ? "Completed" : "Pending"}
          </p>
        </div>
      )}
    </div>
  );
});

export default TaskItem;
