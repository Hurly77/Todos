import React from "react";
import { uuidv4 } from "../helpers/task-helpers";

type UseStateProps<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type TasksLayoutContextProps = {
  sidebarState: UseStateProps<boolean>;
  taskListState: UseStateProps<Task[]>;
  taskFormFocusedState: UseStateProps<boolean>;
  currentTaskStates: UseStateProps<Task>;
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
  const [taskFormFocused, setTaskFormFocused] = React.useState(false);
  const [currentTask, setCurrentTask] = React.useState({
    id: uuidv4(),
    title: "",
    date: null,
    completed: false,
    reminder: null,
    repeat: null,
  } as Task);

  console.log("taskList", taskList.length);

  const value = {
    taskListState: [taskList, setTaskList] as UseStateProps<Task[]>,
    sidebarState: [sidebarOpen, setSidebarOpen] as UseStateProps<boolean>,
    taskFormFocusedState: [taskFormFocused, setTaskFormFocused] as UseStateProps<boolean>,
    currentTaskStates: [currentTask, setCurrentTask] as UseStateProps<Task>,
  };

  return <TasksLayoutContext.Provider value={value}>{children}</TasksLayoutContext.Provider>;
}
