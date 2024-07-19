import { useState } from "react";
import { SquarePen } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "@/components/task-board/task-form";
import { useBoardState } from "@/hooks/useBoardState";
import { useTaskStore } from "@/hooks/useTaskStore";

import { type Task } from "@/utils/types";

interface CardProps {
  task: Task;
  groupIndex: number;
  itemIndex: number;
}

export const Card = ({ task, groupIndex, itemIndex }: CardProps) => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const { setDragState, setTargetItemIndex } = useBoardState();
  const { updateTask } = useTaskStore();

  // Set the drag state
  const handleDragStart = (e: React.DragEvent) => {
    // Set task_uid data to the dataTransfer object
    e.dataTransfer.setData("task_uid", task.uid);

    // Create a ghost drag element and style it
    const crt = document.createElement("div");
    crt.innerHTML = `
      <div class="scale-50 origin-top-left w-[22rem]">
        <div class="bg-white rounded-xl flex flex-col justify-between min-h-40 p-4">
          <div>
            <h3 class="text-lg font-bold">${task.title}</h3>
            <p>${task.description}</p>
          </div>
          <div class="self-end">
            <p class="text-sm text-gray-500">Assignee: ${task.assignee}</p>
          </div>
        </div>
      </div>
    `;
    crt.id = "drag-ghost";
    crt.style.position = "absolute";
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 0, 0);

    // Set the drag state
    setDragState({ groupIndex, itemIndex });
  };

  // Set the target item index
  const handleDragEnterCapture = (e: React.DragEvent) => {
    e.stopPropagation();
    setTargetItemIndex(itemIndex);
  };

  // Prevent default drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Update the task
  const onUpdateTask = (data: Omit<Task, "uid">) => {
    updateTask({
      uid: task.uid,
      ...data,
    });
    setIsTaskFormOpen(false);
  };

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnterCapture={handleDragEnterCapture}
      onDragOver={handleDragOver}
      className="cursor-grab active:cursor-grabbing pb-2 opacity-95 hover:opacity-100 transition-opacity"
    >
      <div className="bg-white relative rounded select-none flex z-0 flex-col justify-between min-h-40 p-4">
        <div className="absolute inset-1 border-2 border-slate-800">
          {/* Task Form Dialog */}
          <Dialog open={isTaskFormOpen} onOpenChange={setIsTaskFormOpen}>
            <DialogTrigger>
              <SquarePen className="absolute right-1 top-1 hover:cursor-pointer z-20 text-slate-800 hover:text-orange-500 transition-all scale-90 hover:scale-100" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Task</DialogTitle>
                <DialogDescription>
                  Fill out the form to update the task
                </DialogDescription>
              </DialogHeader>
              <TaskForm
                task={task}
                onSubmit={onUpdateTask}
                onCancel={() => setIsTaskFormOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p>{task.description}</p>
        </div>
        <div className="self-end">
          <p className="text-sm text-gray-500">Assignee: {task.assignee}</p>
        </div>
      </div>
    </div>
  );
};
