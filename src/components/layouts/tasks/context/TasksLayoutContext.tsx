import React from "react";
import { uuidv4 } from "../helpers/task-helpers";

type UseStateProps<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type TasksLayoutContextProps = {
  sidebarState: UseStateProps<boolean>;
  taskListState: UseStateProps<Task[]>;
  taskFormFocusedState: UseStateProps<boolean>;
  currentTaskStates: UseStateProps<Task>;
  datePickerStates: UseStateProps<string | null>;
};

export type TasksLayoutContextProviderProps = {
  children: React.ReactNode;
};

export type Task = {
  id: string;
  title: string;
  date: Date | null;
  completed: boolean;
  reminder: Date | null;
  repeat: number | null;
};

export const TasksLayoutContext = React.createContext({} as TasksLayoutContextProps);

export default function TasksLayoutContextProvider({ children }: TasksLayoutContextProviderProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [taskList, setTaskList] = React.useState([] as Task[]);
  const [taskFormFocused, setTaskFormFocused] = React.useState(true);
  const [calendarOpen, setCalendarOpen] = React.useState(null);
  const [currentTask, setCurrentTask] = React.useState({
    id: "",
    title: "",
    date: null,
    completed: false,
    reminder: null,
    repeat: null,
  } as Task);

  const value = {
    taskListState: [taskList, setTaskList] as UseStateProps<Task[]>,
    sidebarState: [sidebarOpen, setSidebarOpen] as UseStateProps<boolean>,
    taskFormFocusedState: [taskFormFocused, setTaskFormFocused] as UseStateProps<boolean>,
    currentTaskStates: [currentTask, setCurrentTask] as UseStateProps<Task>,
    datePickerStates: [calendarOpen, setCalendarOpen] as UseStateProps<string | null>,
  };

  return <TasksLayoutContext.Provider value={value}>{children}</TasksLayoutContext.Provider>;
}
