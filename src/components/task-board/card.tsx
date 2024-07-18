import { Edit } from "react-feather";

import { useBoardState } from "@/hooks/useBoardState";

import { type Task } from "@/utils/types";

interface CardProps {
  task: Task;
  groupIndex: number;
  itemIndex: number;
}

export const Card = ({ task, groupIndex, itemIndex }: CardProps) => {
  const { setDragState, setTargetItemIndex } = useBoardState();

  const handleDragStart = () => {
    setDragState({ groupIndex, itemIndex });
  };

  const handleDragEnterCapture = (e: React.DragEvent) => {
    e.stopPropagation();
    setTargetItemIndex(itemIndex);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnterCapture={handleDragEnterCapture}
      onDragOver={handleDragOver}
      className="cursor-grab active:cursor-grabbing pb-2"
    >
      <div className="bg-white relative rounded select-none flex z-0 flex-col justify-between min-h-40 p-4">
        <div className="absolute inset-1 border-2 border-secondary-background">
          <Edit
            className="text-secondary-background absolute right-1 top-1 hover:cursor-pointer z-20 hover:text-warning-background transition-all scale-90 hover:scale-100"
            onClick={() => console.log("clicked")}
          />
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
