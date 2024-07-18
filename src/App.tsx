import { useEffect } from "react";

import { Header } from "./components/layout/header";
import { TaskBoard } from "./components/task-board/board";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTaskStore } from "./hooks/useTaskStore";

import { type Task } from "./utils/types";

import dummy from "./data/dummy.json";

export const App = () => {
  const [state, setState] = useLocalStorage(
    "tasks",
    dummy as Omit<Task, "uid">[]
  );
  const { taskGroups, setTaskGroups, setTasksState } = useTaskStore();

  // Initialize task groups from local storage on first load
  useEffect(() => {
    setTaskGroups(state);
  }, []);

  // Update local storage when task groups change
  useEffect(() => {
    const tasks = taskGroups
      .map((taskGroup) =>
        taskGroup.tasks.map((task) => {
          const { uid, ...rest } = task;
          return rest;
        })
      )
      .flat();

    setState(tasks);
    setTasksState(tasks);
  }, [taskGroups]);

  return (
    <div className="bg-neutral-100">
      <div className="max-w-7xl p-4 grid grid-rows-[auto_1fr] gap-6 mx-auto h-screen">
        <Header />
        <TaskBoard />
      </div>
    </div>
  );
};
