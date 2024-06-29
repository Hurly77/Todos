import TasksLayout from "@/components/layouts/tasks/layout";
import { NextPageWithLayout } from "../_app";
import ImportantTasksPage from "@/components/layouts/tasks/pages/ImportantPage";
import Head from "next/head";

export const ImportantTasks: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Important - Toduit</title>
        <meta name="description" content="Important Tasks" />
      </Head>
      <ImportantTasksPage />
    </>
  );
};

ImportantTasks.getLayout = function getLayout(page) {
  return <TasksLayout>{page}</TasksLayout>;
};

export default ImportantTasks;
