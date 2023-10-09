import { Textarea } from "@nextui-org/react";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import React from "react";
import { updateTask } from "@/lib/sdk/methods";

export default function TaskEditorNotes() {
  const { taskInEdit, setTaskInEdit } = React.useContext(TasksLayoutContext);

  return (
    <div className="p-4 w-full dark:bg-default-100 bg-white space-y-4 text-sm rounded-sm">
      <Textarea
        radius="sm"
        variant="bordered"
        placeholder="Add a note"
        className="hover:bg-transparent"
        value={taskInEdit?.notes ?? ""}
        onValueChange={(value) => {
          if (taskInEdit) {
            setTaskInEdit({
              ...taskInEdit,
              notes: value,
            });
          }
        }}
        onFocusChange={(focused) => {
          if (taskInEdit && !focused) {
            updateTask({ id: taskInEdit?.id, notes: taskInEdit?.notes ?? "" });
          }
        }}
        classNames={{
          base: "bg-transparent hover:bg-transparent border-none shadow-transparent",
          input: "bg-transparent hover:bg-transparent border-none",
          inputWrapper: "bg-transparent hover:bg-transparent border-none shadow-none",
          innerWrapper: "bg-transparent hover:bg-transparent",
          mainWrapper: "bg-transparent hover:bg-transparent",
          clearButton: "",
          helperWrapper: "bg-transparent hover:bg-transparent",
        }}
      />
    </div>
  );
}
