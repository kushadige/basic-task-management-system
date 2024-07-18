import { useEffect } from "react";

import { TaskBoard } from "./components/task-board/board";
import { JSONInput } from "./components/ui/json-input";
import { Button } from "./components/ui/button";
import { tasksSchema } from "./utils/schemas";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTaskStore } from "./hooks/useTaskStore";

import { type ValidationError } from "yup";
import { type Task } from "./utils/types";

import dummy from "./data/dummy.json";

export const App = () => {
  const [state, setState] = useLocalStorage(
    "tasks",
    dummy as Omit<Task, "uid">[]
  );
  const { taskGroups, setTaskGroups } = useTaskStore();

  // Validate json input and save it to local storage
  const onSave = (data?: string) => {
    if (!data) {
      throw new Error("No data");
    }

    let parsedData: Omit<Task, "uid">[];
    try {
      parsedData = JSON.parse(data);
    } catch (err) {
      throw new Error("Invalid JSON");
    }

    try {
      tasksSchema.validateSync(parsedData, {
        abortEarly: false,
      });
    } catch (err) {
      const error = err as ValidationError;
      const messages = error.inner.map(
        (e) => `${e.path?.split(".")[0]} ${e.message}`
      );
      throw new Error(JSON.stringify(messages));
    }

    setTaskGroups(parsedData);
  };

  useEffect(() => {
    setTaskGroups(state);
  }, []);

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
  }, [taskGroups]);

  return (
    <div className="bg-neutral-100">
      <div className="max-w-7xl p-4 grid grid-rows-[auto_auto_1fr] mx-auto h-screen">
        <h1 className="text-5xl font-bold text-gray-800 text-center">
          <span className="text-blue-500">Task</span> Board
        </h1>
        <div className="flex flex-nowrap justify-center gap-4 my-6">
          <Button color="secondary">Create Task</Button>
          <JSONInput onSave={onSave} initialData={state} />
        </div>
        <TaskBoard taskGroups={taskGroups} />
      </div>
    </div>
  );
};
