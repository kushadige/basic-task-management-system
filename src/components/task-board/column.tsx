import { GripVertical } from "lucide-react";

import { Card } from "@/components/task-board/card";
import { useBoardState } from "@/hooks/useBoardState";
import { useTaskStore } from "@/hooks/useTaskStore";

import { type Task } from "@/utils/types";

interface ColumnProps {
  status: string;
  label: string;
  color: string;
  tasks: Task[];
  groupIndex: number;
}

export const Column = ({
  status,
  label,
  color,
  tasks,
  groupIndex,
}: ColumnProps) => {
  const { moveTask, taskGroups } = useTaskStore();
  const {
    dragState,
    columnDragState,
    setDragState,
    targetItemIndex,
    setTargetItemIndex,
    setColumnDragState,
  } = useBoardState();

  const handleDragEnd = () => {
    if (dragState === null || targetItemIndex === null) return;

    const task = taskGroups[dragState.groupIndex].tasks[dragState.itemIndex];

    moveTask(
      task,
      dragState.groupIndex,
      dragState.itemIndex,
      groupIndex,
      targetItemIndex,
      status
    );

    // Remove the ghost drag elements on drag end
    removeGhostDragElements();

    // Reset the drag state
    setDragState(null);
  };

  const handleDrop = () => {
    handleDragEnd();
  };

  const handleDropCapture = (e: React.DragEvent) => {
    e.stopPropagation();
    handleDragEnd();
  };

  const handleDragEnter = () => {
    setTargetItemIndex(tasks.length);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.dataTransfer.dropEffect = "move";
    e.preventDefault();
  };

  const removeGhostDragElements = () => {
    const crts = document.querySelectorAll("#drag-ghost");
    crts.forEach((crt) => crt.remove());
  };

  const handleDragStartColumn = () => {
    setColumnDragState({
      groupIndex,
      targetGroupIndex: groupIndex,
      isColumnDraggable: true,
    });
  };

  const handleDragEnterColumn = () => {
    if (columnDragState) {
      setColumnDragState({ ...columnDragState, targetGroupIndex: groupIndex });
    }
  };

  return (
    <div
      draggable={columnDragState?.isColumnDraggable}
      onDragEnter={handleDragEnterColumn}
      className="bg-neutral-800 border-neutral-700 drop-shadow-xl rounded-lg flex flex-col overflow-hidden w-96 max-w-full flex-1 shrink-0"
    >
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h3
          className="font-bold text-center text-xl uppercase"
          style={{
            color: color,
          }}
        >
          {label}
        </h3>
        <div className="flex items-center gap-2">
          <GripVertical
            id="column-drag"
            onMouseDown={handleDragStartColumn}
            className="text-neutral-400 cursor-grab active:cursor-grabbing"
            size={16}
          />
          <span className="text-xl text-neutral-400">{tasks.length}</span>
        </div>
      </div>
      <div
        className="flex-1 p-4 flex flex-col overflow-hidden"
        onDragEnd={(e) => {
          e.stopPropagation();
          setDragState(null);
          removeGhostDragElements();
        }}
        onDrop={handleDrop}
      >
        <div className="flex flex-col h-full overflow-y-scroll">
          {tasks.map((task, idx) => (
            <Card
              key={idx}
              task={task}
              groupIndex={groupIndex}
              itemIndex={idx}
            />
          ))}

          <div
            className="border border-dashed border-gray-200 py-0 rounded-md transition-[padding,opacity] bg-neutral-800 flex-1"
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDropCapture={handleDropCapture}
          ></div>
        </div>
      </div>
    </div>
  );
};
