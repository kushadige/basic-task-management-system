export interface Task {
  uid: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
}

export interface TaskGroup {
  status: string;
  label: string;
  color: string;
  tasks: Task[];
}
