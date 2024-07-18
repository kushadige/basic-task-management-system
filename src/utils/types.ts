export type Status = "To Do" | "In Progress" | "Done";

export interface Task {
  uid: string;
  title: string;
  description: string;
  status: Status;
  assignee: string;
}

export interface TaskGroup {
  status: Status;
  label: string;
  color: string;
  tasks: Task[];
}
