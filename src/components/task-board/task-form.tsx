import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTaskStore } from "@/hooks/useTaskStore";

import { taskSchema } from "@/utils/schemas";
import { type Task } from "@/utils/types";

interface TaskFormProps {
  onSubmit: (data: Omit<Task, "uid">) => void;
  onCancel?: () => void;
  task?: Task;
}

export const TaskForm = ({ onSubmit, onCancel, task }: TaskFormProps) => {
  const { taskGroups } = useTaskStore();

  const taskStatuses = useMemo(() => {
    return taskGroups.map((taskGroup) => taskGroup.status);
  }, [taskGroups]);

  const defaultValues: Omit<Task, "uid"> = useMemo(
    () => ({
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "To Do",
      assignee: task?.assignee || "",
    }),
    [task]
  );

  const form = useForm<Omit<Task, "uid">>({
    resolver: yupResolver(taskSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title
                <span className="text-red-500"> *</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  value={field.value}
                  placeholder="Title"
                />
              </FormControl>
              <FormDescription>Provide a title for the task</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description
                <span className="text-red-500"> *</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  value={field.value}
                  placeholder="Description"
                />
              </FormControl>
              <FormDescription>
                Provide a detailed description of the task
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Status
                <span className="text-red-500"> *</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {taskStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select the status of the task</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assignee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Assignee
                <span className="text-red-500"> *</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  value={field.value}
                  placeholder="Assignee"
                />
              </FormControl>
              <FormDescription>
                Provide the name of the person assigned to the task
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <div className="mt-4 space-x-2.5">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              {task ? "Update Task" : "Create New Task"}
            </Button>
            <Button type="button" onClick={onCancel} variant="destructive">
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
