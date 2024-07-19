import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CirclePlus, Code } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { JSONInput } from "@/components/ui/json-input";
import { TaskForm } from "@/components/task-board/task-form";
import { DeleteTaskArea } from "@/components/task-board/delete-task-area";
import { groupTasksByStatus, useTaskStore } from "@/hooks/useTaskStore";
import { tasksSchema } from "@/utils/schemas";

import { type ValidationError } from "yup";
import { type Task } from "@/utils/types";

export const Header = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isJsonInputOpen, setIsJsonInputOpen] = useState(false);
  const [tasks, setTasks] = useState<Omit<Task, "uid">[]>();
  const { taskGroups, setTaskGroups, addTask } = useTaskStore();

  useEffect(() => {
    const tasks = taskGroups
      .map((taskGroup) =>
        taskGroup.tasks.map((task) => {
          const { uid, ...rest } = task;
          return rest;
        })
      )
      .flat();

    setTasks(tasks);
  }, [taskGroups]);

  // Save the JSON input
  const onSaveJsonInput = (data?: string) => {
    if (!data) {
      throw new Error("No data");
    }

    // Parse the data
    let parsedData: Omit<Task, "uid">[];
    try {
      parsedData = JSON.parse(data);
    } catch (err) {
      throw new Error("Invalid JSON");
    }

    // Validate the parsed data
    try {
      tasksSchema.validateSync(parsedData, {
        abortEarly: false,
      });
    } catch (err) {
      const error = err as ValidationError;

      // Map the error messages
      const messages = error.inner.map(
        (e) => `${e.path?.split(".")[0]} ${e.message}`
      );
      throw new Error(JSON.stringify(messages));
    }

    // Update the task groups
    const tasksWithUids = parsedData.map((task) => ({
      ...task,
      uid: uuidv4(),
    }));
    const taskGroups = groupTasksByStatus(tasksWithUids);
    setTaskGroups(taskGroups);

    // Close the dialog
    setIsJsonInputOpen(false);
  };

  // Create a new task
  const onCreateTask = (data: Omit<Task, "uid">) => {
    addTask(data);
    setIsTaskFormOpen(false);
  };

  return (
    <header className="flex flex-wrap flex-col sm:flex-row gap-x-8 gap-y-2 sm:justify-between items-center">
      <h1 className="text-3xl tracking-tight uppercase font-extrabold text-gray-800 whitespace-nowrap">
        <span className="text-blue-500">Task</span> Board
      </h1>
      <div className="flex flex-col-reverse sm:flex-row justify-center gap-4">
        {/* Delete Task Area */}
        <DeleteTaskArea />

        <div className="flex gap-4">
          {/* Task Form Dialog */}
          <Dialog open={isTaskFormOpen} onOpenChange={setIsTaskFormOpen}>
            <DialogTrigger asChild>
              <Button>
                <CirclePlus className="mr-2" size={16} />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Task</DialogTitle>
                <DialogDescription>
                  Fill out the form to create a new task
                </DialogDescription>
              </DialogHeader>
              <TaskForm
                onSubmit={onCreateTask}
                onCancel={() => setIsTaskFormOpen(false)}
              />
            </DialogContent>
          </Dialog>

          {/* JSON Input Dialog */}
          <Dialog open={isJsonInputOpen} onOpenChange={setIsJsonInputOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Code className="mr-2" size={16} />
                JSON Input
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>JSON Input</DialogTitle>
                <DialogDescription>Input your JSON data here</DialogDescription>
              </DialogHeader>
              <JSONInput
                data={tasks}
                onSave={onSaveJsonInput}
                onCancel={() => setIsJsonInputOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};
