import { useBoardState } from "@/hooks/useBoardState";
import { useTaskStore } from "@/hooks/useTaskStore";
import { Card } from "./card";

import { type Task, type Status } from "@/utils/types";

interface ColumnProps {
  status: Status;
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
  const { dragState, targetItemIndex, setTargetItemIndex } = useBoardState();

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
    e.preventDefault();
  };

  return (
    <div className="bg-neutral-800 border-neutral-700 drop-shadow-xl rounded-lg flex flex-col overflow-hidden min-w-80 shrink-0">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h3
          className="font-bold text-center text-xl uppercase"
          style={{
            color: color,
          }}
        >
          {label}
        </h3>
        <span className="text-xl text-neutral-400">{tasks.length}</span>
      </div>
      <div
        className="flex-1 p-4 flex flex-col overflow-hidden"
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
            className="border-2 border-dashed border-gray-200 py-0 rounded-md transition-[padding,opacity] bg-neutral-800 flex-1"
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDropCapture={handleDropCapture}
          ></div>
        </div>
      </div>
    </div>
  );
};
