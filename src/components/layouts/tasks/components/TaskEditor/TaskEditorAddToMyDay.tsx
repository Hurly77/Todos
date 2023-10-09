import { SunIcon } from "@heroicons/react/24/outline";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import React from "react";
import { classNames } from "@/components/layouts/app/helpers/twind-helper";
import { updateTask } from "@/lib/sdk/methods";

export default function TaskEditorAddToMyDay() {
  const { taskInEdit, setTaskInEdit } = React.useContext(TasksLayoutContext);

  const myDayDate = taskInEdit?.my_day_date ? new Date(taskInEdit?.my_day_date) : null;
  const myDayDateIsToday = myDayDate ? myDayDate?.getTime() >= new Date().setHours(0, 0, 0, 0) : false;
  const isMyDay = taskInEdit?.is_my_day === true && myDayDateIsToday === true;

  return (
    <div
      onClick={() => {
        if (taskInEdit) {
          setTaskInEdit({
            ...taskInEdit,
            is_my_day: !isMyDay,
            my_day_date: !isMyDay ? new Date().toISOString() : null,
          });
          updateTask({
            id: taskInEdit?.id,
            is_my_day: !isMyDay,
            my_day_date: !isMyDay ? new Date().toISOString() : null,
          });
        }
      }}
      className={classNames(
        "p-4 w-full cursor-pointer dark:bg-default-100 bg-white space-y-4 rounded-sm",
        isMyDay ? "text-primary" : "text-foreground"
      )}
    >
      <div className="flex items-center w-full space-x-2">
        <SunIcon className={classNames("h-6 w-6", isMyDay ? "stoke-primary" : "")} />
        <p>{isMyDay ? "Added" : "Add"} to My Day</p>
      </div>
    </div>
  );
}
