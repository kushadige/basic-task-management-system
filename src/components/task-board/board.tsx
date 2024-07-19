import { useState } from "react";

import { Column } from "@/components/task-board/column";
import { useBoardState } from "@/hooks/useBoardState";
import { useTaskStore } from "@/hooks/useTaskStore";

import { cn } from "@/lib/tw";

export const TaskBoard = () => {
  const { taskGroups, moveColumn } = useTaskStore();
  const { columnDragState, setColumnDragState } = useBoardState();
  const [isDropAreaActive, setIsDropAreaActive] = useState(false);

  const handleColumnDrop = () => {
    if (
      columnDragState?.groupIndex !== undefined &&
      columnDragState?.targetGroupIndex !== undefined
    ) {
      moveColumn(columnDragState.groupIndex, columnDragState.targetGroupIndex);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.dataTransfer.dropEffect = "move";
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setColumnDragState(null);
  };

  const handleDragEnter = () => {
    setIsDropAreaActive(true);
  };

  const handleDragLeave = () => {
    setIsDropAreaActive(false);
  };

  return (
    <div className="grid grid-flow-col auto-cols-max overflow-y-hidden overflow-x-scroll gap-4 rounded-lg pt-4">
      {taskGroups.map((taskGroup, index) => {
        const isDropAreaVisible =
          columnDragState?.targetGroupIndex === index &&
          columnDragState?.groupIndex !== index;
        return (
          <div
            key={index}
            onDragEnd={handleDragEnd}
            className="flex flex-col overflow-hidden relative"
          >
            <div
              onDrop={handleColumnDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              className={cn(
                "border border-dashed border-neutral-800 bg-neutral-800/10 py-0 invisible rounded mb-1 transition-all",
                isDropAreaVisible && "py-3 visible",
                isDropAreaVisible &&
                  isDropAreaActive &&
                  "bg-orange-200 border-2 border-orange-800 py-4 animate-pulse"
              )}
            ></div>
            <Column
              status={taskGroup.status}
              label={taskGroup.label}
              color={taskGroup.color}
              tasks={taskGroup.tasks}
              groupIndex={index}
            />
          </div>
        );
      })}
    </div>
  );
};
