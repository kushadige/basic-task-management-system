import { Column } from "./column";

import { type TaskGroup } from "@/utils/types";

interface TaskBoardProps {
  taskGroups: TaskGroup[];
}

export const TaskBoard = ({ taskGroups }: TaskBoardProps) => {
  return (
    <div className="grid grid-cols-[repeat(3,_auto)] lg:grid-cols-3 overflow-y-hidden overflow-x-scroll gap-4">
      {taskGroups.map((taskGroup, index) => (
        <Column
          key={index}
          status={taskGroup.status}
          label={taskGroup.label}
          color={taskGroup.color}
          tasks={taskGroup.tasks}
          groupIndex={index}
        />
      ))}
    </div>
  );
};
