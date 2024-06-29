import React from "react";
import { TaskFormat, TaskRow } from "@/lib/sdk/models/TaskModel";

type UseStateProps<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type TasksLayoutContextProps = {
  sidebarState: UseStateProps<boolean>;
  taskListState: UseStateProps<TaskFormat[]>;
  taskFormFocusedState: UseStateProps<boolean>;
  currentTaskStates: UseStateProps<Task>;
  datePickerStates: UseStateProps<string | null>;
  taskEditorOpen: boolean;
  taskInEdit: TaskFormat | null;
  setTaskInEdit: React.Dispatch<React.SetStateAction<TaskFormat | null>>;
  openTaskEditor: (task: TaskFormat) => void;
  closeTaskEditor: () => void;
};

export type TasksLayoutContextProviderProps = {
  children: React.ReactNode;
};

export const TasksLayoutContext = React.createContext({} as TasksLayoutContextProps);

export default function TasksLayoutContextProvider({ children }: TasksLayoutContextProviderProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [taskList, setTaskList] = React.useState<TaskFormat[]>([]);
  const [taskFormFocused, setTaskFormFocused] = React.useState(true);
  const [calendarOpen, setCalendarOpen] = React.useState(null);
  const [taskInEdit, setTaskInEdit] = React.useState<TaskFormat | null>(null);
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
    setTimeout(() => setTaskInEdit(null), 600);
  };

  function openTaskEditor(task: TaskFormat) {
    setTaskEditorOpen(true);
    setTaskInEdit(task);
  }

  const value: TasksLayoutContextProps = {
    openTaskEditor,
    closeTaskEditor,
    taskEditorOpen,
    taskInEdit,
    setTaskInEdit,
    taskListState: [taskList, setTaskList],
    sidebarState: [sidebarOpen, setSidebarOpen] as UseStateProps<boolean>,
    taskFormFocusedState: [taskFormFocused, setTaskFormFocused] as UseStateProps<boolean>,
    currentTaskStates: [currentTask, setCurrentTask] as UseStateProps<Task>,
    datePickerStates: [calendarOpen, setCalendarOpen] as UseStateProps<string | null>,
  };

  return <TasksLayoutContext.Provider value={value}>{children}</TasksLayoutContext.Provider>;
}
