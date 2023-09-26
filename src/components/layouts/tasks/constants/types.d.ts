declare type UseStateProps<T> = [T, React.Dispatch<React.SetStateAction<T>>];

declare type TasksLayoutContextProps = {
  sidebarState: UseStateProps<boolean>;
  taskListState: UseStateProps<Task[]>;
  taskFormFocusedState: UseStateProps<boolean>;
  currentTaskStates: UseStateProps<Task>;
};

declare type TasksLayoutContextProviderProps = {
  children: React.ReactNode;
};

declare type Task = {
  id: string;
  title: string;
  date: Date | null;
  completed: boolean;
  reminder: Date | null;
  important: boolean;
  repeat: {
    interval: number;
    days: number[];
    type: "days" | "weeks" | "months" | "years";
  } | null;
  steps?: string[];
  category?: string;
  files?: File[];
  notes?: string;
};

type TaskSpecificDropdownsProps = {
  placeholder?: string;
  hasChip?: boolean;
  task: Task | null;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
  datePickerOpen: string | null;
  setDatePickerOpen: React.Dispatch<React.SetStateAction<string | null>>;
};
