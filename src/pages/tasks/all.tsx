import TasksLayout from "@/components/layouts/tasks/layout";
import { NextPageWithLayout } from "../_app";
import AllTasksPage from "@/components/layouts/tasks/pages/AllTasksPage";
import Head from "next/head";

export const Tasks: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Tasks - Toduit</title>
        <meta name="description" content="Important Tasks" />
      </Head>
      <AllTasksPage />
    </>
  );
};

Tasks.getLayout = function getLayout(page) {
  return <TasksLayout>{page}</TasksLayout>;
};

export default Tasks;
