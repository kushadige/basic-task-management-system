import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "./components/ui/button";
import { Header } from "./components/layout/header";
import { TaskBoard } from "./components/task-board/board";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { groupTasksByStatus, useTaskStore } from "./hooks/useTaskStore";

import { taskGroupsSchema } from "./utils/schemas";

import dummy from "./data/dummy.json";

export const App = () => {
  // Initialize local storage
  const [state, setState] = useLocalStorage(
    "tasks",
    (function () {
      const tasksWithUids = dummy.map((task) => ({ ...task, uid: uuidv4() }));
      const taskGroups = groupTasksByStatus(tasksWithUids);
      return taskGroups;
    })()
  );
  const { taskGroups, setTaskGroups } = useTaskStore();

  // Initialize task groups from local storage on first load
  useEffect(() => {
    setTaskGroups(state);
  }, []);

  // Update local storage when task groups change
  useEffect(() => {
    setState(taskGroups);
  }, [taskGroups]);

  // Validate local storage schema
  try {
    taskGroupsSchema.validateSync(taskGroups);
  } catch (err) {
    return (
      <div className=" p-4 h-screen text-center bg-red-50 flex flex-col justify-center items-center space-y-4">
        <h1 className="text-red-500 text-2xl font-bold">
          Local storage schema validation error - Please clear local storage
        </h1>
        <Button
          className="bg-red-500 hover:bg-red-600 text-white"
          size="lg"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Clear Local Storage
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 max-w-full w-full p-4 gap-6 mx-auto h-screen flex flex-row justify-center overflow-hidden py-4">
      <div className="grid grid-rows-[auto_1fr]">
        <Header />
        <TaskBoard />
      </div>
    </div>
  );
};
