import React, { useState, useCallback } from "react";
import { Task } from "../types/taskTypes";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../store/taskSlice";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RootState } from "../store";

interface TaskFormProps {
  taskToEdit?: Task | null;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = React.memo(
  ({ taskToEdit, onCancel }) => {
    const [title, setTitle] = useState(taskToEdit?.title || "");
    const [description, setDescription] = useState(
      taskToEdit?.description || ""
    );
    const [dueDate, setDueDate] = useState(
      taskToEdit?.dueDate || format(new Date(), "yyyy-MM-dd")
    );
    const dispatch = useDispatch();
    const { saveTasksToLocalStorage } = useLocalStorage();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();

        const task: Task = {
          id: taskToEdit?.id || Date.now().toString(),
          title,
          description,
          dueDate,
          completed: taskToEdit?.completed || false,
        };

        if (taskToEdit) {
          dispatch(editTask(task));
          saveTasksToLocalStorage(
            tasks.map((t) => (t.id === task.id ? task : t))
          );
        } else {
          dispatch(addTask(task));
          saveTasksToLocalStorage([...tasks, task]);
        }

        // Reset form if not editing
        if (!taskToEdit) {
          setTitle("");
          setDescription("");
          setDueDate(format(new Date(), "yyyy-MM-dd"));
        }
      },
      [
        title,
        description,
        dueDate,
        taskToEdit,
        dispatch,
        saveTasksToLocalStorage,
        tasks,
      ]
    );

    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md mb-6"
      >
        <h2 className="text-xl font-bold mb-4">
          {taskToEdit ? "Edit Task" : "Add New Task"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="dueDate">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {taskToEdit ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    );
  }
);

export default TaskForm;
