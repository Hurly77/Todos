import TasksLayout from "@/components/layouts/tasks/layout";
import { NextPageWithLayout } from "../_app";
import TasksPage from "@/components/layouts/tasks/pages/index";
import Head from "next/head";

export const Tasks: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Today - Toduit</title>
        <meta name="description" content="Today's tasks" />
      </Head>
      <TasksPage />
    </>
  );
};

Tasks.getLayout = function getLayout(page) {
  return <TasksLayout>{page}</TasksLayout>;
};

export default Tasks;
