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
  id: string | number;
  title: string;
  date: Date | null;
  reminder: Date | null;
  repeat: {
    interval: number;
    days: number[] | null;
    type: "days" | "weeks" | "months" | "years";
  } | null;
};

type TaskSpecificDropdownsProps<T extends TaskFormat> = {
  placeholder?: string;
  hasChip?: boolean;
  task: T | null;
  setTask: React.Dispatch<React.SetStateAction<T | null>>;
  datePickerOpen: string | null;
  setDatePickerOpen: React.Dispatch<React.SetStateAction<string | null>>;
};
