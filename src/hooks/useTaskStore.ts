import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

import { getRandomHexColor } from "@/utils/color-generator";
import { type TaskGroup, type Task } from "@/utils/types";

interface TaskState {
  taskGroups: TaskGroup[];
  setTaskGroups: (tasks: TaskGroup[]) => void;
  addTask: (task: Omit<Task, "uid">) => void;
  removeTask: (task_uid: string) => void;
  updateTask: (task: Task) => void;
  moveTask: (
    task: Task,
    groupIndex: number,
    itemIndex: number,
    targetGroupIndex: number,
    targetItemIndex: number,
    targetGroupStatus: string
  ) => void;
  moveColumn: (groupIndex: number, targetGroupIndex: number) => void;
}

export const groupTasksByStatus = (tasks: Task[]) => {
  return tasks.reduce((acc: TaskGroup[], task) => {
    const group = acc.find((group) => group.status === task.status);
    if (group) {
      group.tasks.push(task);
    } else {
      acc.push({
        status: task.status,
        label: task.status,
        color: getRandomHexColor(),
        tasks: [task],
      });
    }
    return acc;
  }, []);
};

export const useTaskStore = create<TaskState>((set) => ({
  taskGroups: [],
  setTaskGroups: (taskGroups) =>
    set(() => {
      return { taskGroups };
    }),

  // Add task
  addTask: (task) =>
    set((state) => {
      const newTask = { ...task, uid: uuidv4() };
      const groupIndex = state.taskGroups.findIndex(
        (taskGroup) => taskGroup.status === task.status
      );

      if (groupIndex === -1) return state; // If the task status is not found, return state unchanged

      const newTaskGroups = state.taskGroups.map((taskGroup, idx) => {
        if (idx === groupIndex) {
          return {
            ...taskGroup,
            tasks: [...taskGroup.tasks, newTask],
          };
        }
        return taskGroup;
      });

      return {
        taskGroups: newTaskGroups,
      };
    }),

  // Remove task
  removeTask: (task_uid) =>
    set((state) => {
      const groupIndex = state.taskGroups.findIndex((taskGroup) =>
        taskGroup.tasks.some((task) => task.uid === task_uid)
      );

      if (groupIndex === -1) return state; // If the task is not found, return state unchanged

      const taskGroups = state.taskGroups.map((taskGroup, idx) =>
        idx === groupIndex
          ? {
              ...taskGroup,
              tasks: taskGroup.tasks.filter((task) => task.uid !== task_uid),
            }
          : taskGroup
      );

      return {
        taskGroups,
      };
    }),

  // Update task
  updateTask: (updatedTask) =>
    set((state) => {
      const tasks = state.taskGroups
        .map((taskGroup) => taskGroup.tasks.slice())
        .flat();

      const taskIndex = tasks.findIndex((task) => task.uid === updatedTask.uid);
      const groupIndex = state.taskGroups.findIndex(
        (taskGroup) => taskGroup.status === tasks[taskIndex].status
      );
      const targetGroupIndex = state.taskGroups.findIndex(
        (taskGroup) => taskGroup.status === updatedTask.status
      );

      if (taskIndex === -1) return state; // If the task is not found, return state unchanged

      // Shallow copy of tasks
      let updatedTasks = tasks.slice();

      // Update task
      updatedTasks[taskIndex] = updatedTask;

      // Move task to the correct group
      if (groupIndex === targetGroupIndex) {
        const taskGroups = state.taskGroups.map((taskGroup, idx) =>
          idx === groupIndex ? { ...taskGroup, tasks: updatedTasks } : taskGroup
        );

        return {
          taskGroups,
        };
      }

      const updatedSourceGroup = {
        ...state.taskGroups[groupIndex],
        tasks: state.taskGroups[groupIndex].tasks.filter(
          (task) => task.uid !== updatedTask.uid
        ),
      };

      const updatedTargetGroup = {
        ...state.taskGroups[targetGroupIndex],
        tasks: [...state.taskGroups[targetGroupIndex].tasks, updatedTask],
      };

      const taskGroups = state.taskGroups.map((taskGroup, idx) =>
        idx === groupIndex
          ? updatedSourceGroup
          : idx === targetGroupIndex
          ? updatedTargetGroup
          : taskGroup
      );

      return {
        taskGroups,
      };
    }),

  // Move task
  moveTask: (
    task,
    groupIndex,
    itemIndex,
    targetGroupIndex,
    targetItemIndex,
    targetGroupStatus
  ) =>
    set((state) => {
      // Move task within the same group
      if (groupIndex === targetGroupIndex) {
        const updatedTasks = state.taskGroups[groupIndex].tasks.slice();
        updatedTasks.splice(
          targetItemIndex,
          0,
          ...updatedTasks.splice(itemIndex, 1)
        );

        return {
          taskGroups: state.taskGroups.map((taskGroup, idx) =>
            idx === groupIndex
              ? { ...taskGroup, tasks: updatedTasks }
              : taskGroup
          ),
        };
      }

      // Update task status
      const updatedTask = { ...task, status: targetGroupStatus };

      // Remove task from source group
      const updatedSourceGroup = {
        ...state.taskGroups[groupIndex],
        tasks: state.taskGroups[groupIndex].tasks.filter(
          (t) => t.uid !== task.uid
        ),
      };

      // Add task to target group
      const updatedTargetGroup = {
        ...state.taskGroups[targetGroupIndex],
        tasks: [
          ...state.taskGroups[targetGroupIndex].tasks.slice(0, targetItemIndex),
          updatedTask,
          ...state.taskGroups[targetGroupIndex].tasks.slice(targetItemIndex),
        ],
      };

      return {
        taskGroups: state.taskGroups.map((taskGroup, idx) =>
          idx === groupIndex
            ? updatedSourceGroup
            : idx === targetGroupIndex
            ? updatedTargetGroup
            : taskGroup
        ),
      };
    }),

  // Move column
  moveColumn: (groupIndex, targetGroupIndex) =>
    set((state) => {
      // Shallow copy of task groups
      const updatedTaskGroups = state.taskGroups.slice();

      // Move the column
      updatedTaskGroups.splice(
        targetGroupIndex,
        0,
        ...updatedTaskGroups.splice(groupIndex, 1)
      );

      return {
        taskGroups: updatedTaskGroups,
      };
    }),
}));
