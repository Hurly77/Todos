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
  repeat: number | null;
};
