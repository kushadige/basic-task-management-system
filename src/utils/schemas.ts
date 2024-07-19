import * as yup from "yup";

export const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  status: yup.string().required("Status is required"),
  assignee: yup.string().required("Assignee is required"),
});

export const tasksSchema = yup.array().of(taskSchema);

export const taskGroupSchema = yup.object().shape({
  status: yup.string().required("Status is required"),
  label: yup.string().required("Label is required"),
  color: yup.string().required("Color is required"),
  tasks: tasksSchema,
});

export const taskGroupsSchema = yup.array().of(taskGroupSchema);
