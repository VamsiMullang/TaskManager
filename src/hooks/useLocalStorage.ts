import { useEffect } from "react";
import { setTasks } from "../store/taskSlice";
import { Task } from "../types/taskTypes";
import { useDispatch } from "react-redux";

export const useLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      dispatch(setTasks(JSON.parse(savedTasks)));
    }
  }, [dispatch]);

  const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return { saveTasksToLocalStorage };
};
