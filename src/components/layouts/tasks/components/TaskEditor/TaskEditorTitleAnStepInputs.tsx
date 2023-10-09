import createTaskStep from "@/lib/sdk/methods/create-task-step";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Checkbox, Input } from "@nextui-org/react";
import TaskEditorStepInput from "./TaskEditorStepInput";
import React from "react";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import { updateTask } from "@/lib/sdk/methods";

export default function TaskTitleAnStepInputs() {
  const { taskInEdit, setTaskInEdit, taskListState } = React.useContext(TasksLayoutContext);
  const [taskList] = taskListState;
  const [nextStep, setNextStep] = React.useState({
    task_id: taskInEdit?.id,
    title: "",
  });

  async function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    if (taskInEdit) {
      setTaskInEdit({ ...taskInEdit, [name]: value });
    }
  }

  if (!taskInEdit) return <></>;

  return (
    <div className="p-4 w-full dark:bg-default-100 bg-white space-y-1 rounded-sm">
      <div className="flex sticky top-0 dark:bg-default-100 bg-white z-10">
        <Checkbox
          onValueChange={(isCompleted) =>
            updateTask({
              id: taskInEdit.id,
              completed: isCompleted,
            })
          }
        />
        <Input
          name="title"
          radius="sm"
          type="text"
          variant="bordered"
          aria-label="Task Name"
          placeholder="Task Name"
          className="hover:bg-none border-none outline-none top-0"
          classNames={{
            base: "sticky",
            inputWrapper: "default-50 shadow-none h-full border-none",
            input: "text-lg",
          }}
          value={taskInEdit?.title}
          onChange={handleOnChange}
          onFocusChange={(isFocused) => {
            if (!isFocused) {
              updateTask({
                id: taskInEdit.id,
                title: taskInEdit.title,
              });
            }
          }}
        />
      </div>
      <div className="flex flex-col">
        {taskInEdit?.steps?.length
          ? taskInEdit?.steps.map((step) => <TaskEditorStepInput key={step.id} step={step} />)
          : null}
        <div className="flex items-center">
          <PlusIcon className="h-6 w-6 stroke-primary" />
          <Input
            name="title"
            aria-label="Task Name"
            variant="bordered"
            className="hover:bg-none border-none outline-none"
            classNames={{
              inputWrapper: "default-50 shadow-none h-full border-none",
              input: "text-md foreground-500",
            }}
            placeholder={taskInEdit?.steps?.length === 0 ? "add step" : "next step"}
            value={nextStep?.title}
            onValueChange={(value) => setNextStep({ task_id: taskInEdit?.id, title: value })}
            endContent={
              <p
                onClick={async () => {
                  if (nextStep?.task_id) {
                    setNextStep({ ...nextStep, title: "" });
                    const { data: step } = await createTaskStep(nextStep?.task_id, nextStep.title);
                    if (step && taskInEdit) {
                      setTaskInEdit({
                        ...taskInEdit,
                        steps: [...(taskInEdit?.steps || []), step],
                      });
                    }
                  }
                }}
                className="text-sm text-primary-400 cursor-pointer"
              >
                Add
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
}
