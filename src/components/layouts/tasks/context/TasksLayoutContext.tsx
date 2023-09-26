import React from "react";
import { uuidv4 } from "../helpers/task-helpers";

type UseStateProps<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type TasksLayoutContextProps = {
  sidebarState: UseStateProps<boolean>;
  taskListState: UseStateProps<Task[]>;
  taskFormFocusedState: UseStateProps<boolean>;
  currentTaskStates: UseStateProps<Task>;
  datePickerStates: UseStateProps<string | null>;
  taskEditorOpen: boolean;
  taskInEdit: Task | null;
  setTaskInEdit: React.Dispatch<React.SetStateAction<Task | null>>;
  openTaskEditor: (task: Task) => void;
  closeTaskEditor: () => void;
};

export type TasksLayoutContextProviderProps = {
  children: React.ReactNode;
};

export const TasksLayoutContext = React.createContext({} as TasksLayoutContextProps);

export default function TasksLayoutContextProvider({ children }: TasksLayoutContextProviderProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [taskList, setTaskList] = React.useState([] as Task[]);
  const [taskFormFocused, setTaskFormFocused] = React.useState(true);
  const [calendarOpen, setCalendarOpen] = React.useState(null);
  const [taskInEdit, setTaskInEdit] = React.useState(null as Task | null);
  const [taskEditorOpen, setTaskEditorOpen] = React.useState(false);
  const [currentTask, setCurrentTask] = React.useState({
    id: "",
    title: "",
    date: null,
    completed: false,
    reminder: null,
    repeat: null,
    favorite: false,
    important: false, // add the important property
  } as Task);

  const closeTaskEditor = () => {
    setTaskEditorOpen(false);
    setTaskInEdit(null);
  };

  function openTaskEditor(task: Task) {
    setTaskEditorOpen(true);
    setTaskInEdit(task);
  }

  const value = {
    openTaskEditor,
    closeTaskEditor,
    taskEditorOpen,
    taskInEdit,
    setTaskInEdit,
    taskListState: [taskList, setTaskList] as UseStateProps<Task[]>,
    sidebarState: [sidebarOpen, setSidebarOpen] as UseStateProps<boolean>,
    taskFormFocusedState: [taskFormFocused, setTaskFormFocused] as UseStateProps<boolean>,
    currentTaskStates: [currentTask, setCurrentTask] as UseStateProps<Task>,
    datePickerStates: [calendarOpen, setCalendarOpen] as UseStateProps<string | null>,
  };

  return <TasksLayoutContext.Provider value={value}>{children}</TasksLayoutContext.Provider>;
}
