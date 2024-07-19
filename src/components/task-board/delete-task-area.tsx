import { useState } from "react";
import { Flame, Trash } from "lucide-react";

import { cn } from "@/lib/tw";
import { useBoardState } from "@/hooks/useBoardState";
import { useTaskStore } from "@/hooks/useTaskStore";

export const DeleteTaskArea = () => {
  const [active, setActive] = useState(false);
  const { removeTask } = useTaskStore();
  const { dragState, setDragState } = useBoardState();

  const handleDragEnter = () => {
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    const task_uid = e.dataTransfer.getData("task_uid");
    removeTask(task_uid);
    setDragState(null);
    setActive(false);
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={cn(
        "border border-dashed grid place-content-center px-4 py-2 rounded-md bg-transparent border-neutral-700 text-neutral-700 origin-center transition-all shrink-0",
        !dragState && "hidden",
        active && "bg-red-600 text-white"
      )}
    >
      <div className="pointer-events-none">
        {active ? (
          <Flame size={20} className="animate-bounce" />
        ) : (
          <Trash size={20} />
        )}
      </div>
    </div>
  );
};
