import TasksLayout from "@/components/layouts/tasks/layout";
import { NextPageWithLayout } from "../_app";
import PlannedPage from "@/components/layouts/tasks/pages/PlannedPage";
import Head from "next/head";

export const Tasks: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Planned - Toduit</title>
        <meta name="description" content="Important Tasks" />
      </Head>
      <PlannedPage />
    </>
  );
};

Tasks.getLayout = function getLayout(page) {
  return <TasksLayout>{page}</TasksLayout>;
};

export default Tasks;
