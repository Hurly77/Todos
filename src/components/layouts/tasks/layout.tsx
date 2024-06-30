import ToDosLayoutContextProvider from "./context/TasksLayoutContext";
import Navigation from "./components/Navigation/Navigation";
import Sidebar from "./components/Navigation/Sidebar";
import { useTheme } from "next-themes";
import TaskEditor from "./components/TaskEditor/TaskEditor";
import useSession from "../app/hooks/useSession";
import { Spinner } from "@nextui-org/react";

type ToDosLayoutProps = {
  children: React.ReactNode;
};

export default function TaskLayout({ children }: ToDosLayoutProps) {
  const session = useSession();
  if (!session)
    return (
      <div>
        <Spinner size="lg" />
      </div>
    );
  return (
    <ToDosLayoutContextProvider>
      <div className={"layout"}>
        <Navigation />
        <div className="h-full flex grow border bg-default-100">
          <Sidebar />
          <div className="overflow-y-auto flex h-full max-h-[calc(100vh-66px)] custom-scrollbar grow">{children}</div>
          <TaskEditor />
        </div>
      </div>
    </ToDosLayoutContextProvider>
  );
}
