import { type Status } from "./types";

interface TaskBoardGroup {
  status: Status;
  label: string;
  color: string;
}

export const taskBoardGroupConstants: TaskBoardGroup[] = [
  {
    status: "To Do",
    label: "📝 To Do",
    color: "#e9e6b9",
  },
  {
    status: "In Progress",
    label: "🕖 In Progress",
    color: "#d5e1f0",
  },
  {
    status: "Done",
    label: "🎉 Done",
    color: "#c4e1d9",
  },
];
