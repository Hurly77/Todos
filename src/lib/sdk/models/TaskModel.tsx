export type TaskInsert = Database["public"]["Tables"]["tasks"]["Insert"];
export type TaskUpdate = Database["public"]["Tables"]["tasks"]["Update"];

export type TaskRepeatInsert = Database["public"]["Tables"]["task_repeat"]["Insert"];
export type TaskRepeatUpdate = Database["public"]["Tables"]["task_repeat"]["Update"];

export type TaskStep = Database["public"]["Tables"]["task_steps"]["Row"];
export type TaskStepInsert = Database["public"]["Tables"]["task_steps"]["Insert"];
export type TaskStepUpdate = Database["public"]["Tables"]["task_steps"]["Update"];

export type TaskCategoriesInsert = Database["public"]["Tables"]["task_tag"]["Insert"];
export type TaskCategoriesUpdate = Database["public"]["Tables"]["task_tag"]["Update"];

export type TaskRow = Database["public"]["Tables"]["tasks"]["Row"] & {
  repeat: Database["public"]["Tables"]["task_repeat"]["Row"] | null;
  steps: Database["public"]["Tables"]["task_steps"]["Row"][];
  categories: Database["public"]["Tables"]["task_tag"]["Row"] | null;
};

export type TaskFormat = Omit<TaskRow, "reminder" | "date"> & {
  reminder: Date | null;
  date: Date | null;
};

export type TaskReminder = TaskFormat["repeat"];
