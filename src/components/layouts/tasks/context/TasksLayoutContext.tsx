import React from "react";
import { TaskFormat, TaskRow } from "@/lib/sdk/models/TaskModel";
import useTaskList from "../hooks/useTaskList";
import { TaskFetcherKeys } from "@/lib/sdk/constants/global-enums.";
import { useRouter } from "next/router";
import { KeyedMutator } from "swr";

type UseStateProps<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type TasksLayoutContextProps = {
  listType: TaskFetcherKeys;
  sidebarState: UseStateProps<boolean>;
  taskFormFocusedState: UseStateProps<boolean>;
  currentTaskStates: UseStateProps<Task>;
  datePickerStates: UseStateProps<string | null>;
  taskEditorOpen: boolean;
  taskInEdit: TaskFormat | null;
  setTaskInEdit: React.Dispatch<React.SetStateAction<TaskFormat | null>>;
  openTaskEditor: (task: TaskFormat) => void;
  closeTaskEditor: () => void;
  taskList: TaskFormat[];
  mutate: KeyedMutator<TaskFormat[]>;
};

export type TasksLayoutContextProviderProps = {
  children: React.ReactNode;
};

export const TasksLayoutContext = React.createContext({} as TasksLayoutContextProps);

export default function TasksLayoutContextProvider({ children }: TasksLayoutContextProviderProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
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

  const getListType = (): TaskFetcherKeys => {
    const pathname = router.pathname;
    switch (pathname) {
      case "/tasks":
        return TaskFetcherKeys.MY_DAY;
      case "/tasks/important":
        return TaskFetcherKeys.IMPORTANT;
      case "/tasks/planned":
        return TaskFetcherKeys.PLANNED;
      default:
        return TaskFetcherKeys.ALL;
    }
  };

  const closeTaskEditor = () => {
    setTaskEditorOpen(false);
    setTimeout(() => setTaskInEdit(null), 600);
  };

  function openTaskEditor(task: TaskFormat) {
    setTaskEditorOpen(true);
    setTaskInEdit(task);
  }

  const taskHook = useTaskList(getListType());

  const value: TasksLayoutContextProps = {
    listType: getListType(),
    ...taskHook,
    openTaskEditor,
    closeTaskEditor,
    taskEditorOpen,
    taskInEdit,
    setTaskInEdit,
    sidebarState: [sidebarOpen, setSidebarOpen] as UseStateProps<boolean>,
    taskFormFocusedState: [taskFormFocused, setTaskFormFocused] as UseStateProps<boolean>,
    currentTaskStates: [currentTask, setCurrentTask] as UseStateProps<Task>,
    datePickerStates: [calendarOpen, setCalendarOpen] as UseStateProps<string | null>,
  };

  return <TasksLayoutContext.Provider value={value}>{children}</TasksLayoutContext.Provider>;
}
