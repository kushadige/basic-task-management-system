import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

import { type TaskGroup, type Task, type Status } from "@/utils/types";
import { taskBoardGroupConstants } from "@/utils/constants";

interface TaskState {
  taskGroups: TaskGroup[];
  setTaskGroups: (tasks: Omit<Task, "uid">[]) => void;
  addTask: (task: Omit<Task, "uid">) => void;
  removeTask: (task_uid: string) => void;
  updateTask: (task: Task) => void;
  moveTask: (
    task: Task,
    groupIndex: number,
    itemIndex: number,
    targetGroupIndex: number,
    targetItemIndex: number,
    targetGroupStatus: Status
  ) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  taskGroups: [],
  setTaskGroups: (tasks) =>
    set(() => {
      const tasksWithUids = tasks.map((task) => ({ ...task, uid: uuidv4() }));

      const taskGroups: TaskGroup[] = taskBoardGroupConstants.map(
        (taskBoardGroupConstant) => ({
          status: taskBoardGroupConstant.status,
          label: taskBoardGroupConstant.label,
          color: taskBoardGroupConstant.color,
          tasks: [],
        })
      );

      tasksWithUids.forEach((task) => {
        const group = taskGroups.find((group) => group.status === task.status);
        if (group) {
          group.tasks.push(task);
        }
      });

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

      const newTaskGroups = state.taskGroups.map((taskGroup, idx) => {
        if (idx === groupIndex) {
          return {
            ...taskGroup,
            tasks: taskGroup.tasks.filter((task) => task.uid !== task_uid),
          };
        }
        return taskGroup;
      });

      return {
        taskGroups: newTaskGroups,
      };
    }),

  // Update task
  updateTask: (updatedTask) =>
    set((state) => {
      const groupIndex = state.taskGroups.findIndex((taskGroup) =>
        taskGroup.tasks.some((task) => task.uid === updatedTask.uid)
      );

      if (groupIndex === -1) return state; // If the task is not found, return state unchanged

      const newTaskGroups = state.taskGroups.map((taskGroup, idx) => {
        if (idx === groupIndex) {
          return {
            ...taskGroup,
            tasks: taskGroup.tasks.map((task) =>
              task.uid === updatedTask.uid ? updatedTask : task
            ),
          };
        }
        return taskGroup;
      });

      return {
        taskGroups: newTaskGroups,
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
}));
