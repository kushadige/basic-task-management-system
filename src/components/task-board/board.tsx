import { Column } from "@/components/task-board/column";
import { useTaskStore } from "@/hooks/useTaskStore";

export const TaskBoard = () => {
  const { taskGroups } = useTaskStore();

  return (
    <div className="grid grid-flow-col auto-cols-max overflow-y-hidden overflow-x-scroll gap-4 rounded-lg py-4">
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
