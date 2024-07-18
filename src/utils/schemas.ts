import * as yup from "yup";

export const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  status: yup
    .string()
    .oneOf(["To Do", "In Progress", "Done"], "Invalid status")
    .required("Status is required"),
  assignee: yup.string().required("Assignee is required"),
});

export const tasksSchema = yup.array().of(taskSchema);
