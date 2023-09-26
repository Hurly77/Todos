import ToDosLayoutContextProvider from "./context/TasksLayoutContext";
import Navigation from "./components/Navigation/Navigation";
import Sidebar from "./components/Navigation/Sidebar";
import { useTheme } from "next-themes";
import TaskEditor from "./components/TaskEditor/TaskEditor";

type ToDosLayoutProps = {
  children: React.ReactNode;
};

export default function TaskLayout({ children }: ToDosLayoutProps) {
  return (
    <ToDosLayoutContextProvider>
      <div className={"layout"}>
        <Navigation />
        <div className="h-full flex grow">
          <Sidebar />
          {children}
          <TaskEditor />
        </div>
      </div>
    </ToDosLayoutContextProvider>
  );
}
