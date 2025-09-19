import { classNames } from "@/components/layouts/app/helpers/twind-helper";
import deleteTaskStep from "@/lib/sdk/methods/delete-task-step";
import { updateTaskStep } from "@/lib/sdk/methods/update-task-steps";
import { TaskStep } from "@/lib/sdk/models";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Checkbox, Input, InputProps } from "@nextui-org/react";
import React from "react";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import useTaskList from "../../hooks/useTaskList";

type StepInputProps = {
  step: TaskStep;
};
export default function TaskEditorStepInput(props: StepInputProps) {
  const { step } = props;
  const { taskInEdit, setTaskInEdit, listType } = React.useContext(TasksLayoutContext);
  const [value, setValue] = React.useState(step?.title ?? "");
  const [stepCompleted, setStepCompleted] = React.useState(step?.completed ?? false);

  function onDelete() {}

  return (
    <div className="flex">
      <Checkbox
        radius="full"
        isSelected={stepCompleted}
        onValueChange={(value) => {
          setStepCompleted(value);

          updateTaskStep({
            completed: value,
            id: step?.id,
          });
        }}
      />
      <Input
        radius="sm"
        size="lg"
        type="text"
        variant="bordered"
        className={classNames("hover:bg-none outline-none border-b", stepCompleted ? "line-through" : "")}
        classNames={{
          base: "border-b",
          inputWrapper: "default-50 shadow-none h-full border-none",
          input: "text-sm text-foreground-500",
        }}
        endContent={
          <XMarkIcon
            onClick={() => {
              deleteTaskStep(step?.id);
              if (taskInEdit) {
                setTaskInEdit({
                  ...taskInEdit,
                  steps: taskInEdit.steps.filter((taskStep) => taskStep.id !== step?.id),
                });
              }
            }}
            className="h-5 w-5 cursor-pointer stroke-foreground-600"
          />
        }
        value={value}
        onValueChange={(value) => setValue(value)}
        onFocusChange={(isFocused) => {
          if (!isFocused) {
            updateTaskStep({
              title: value,
              id: step?.id,
            });
          }
        }}
      />
    </div>
  );
}
