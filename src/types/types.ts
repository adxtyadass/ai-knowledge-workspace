export type Task = {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  description?: string;
  completed?: boolean;
  createdAt?: string;
};