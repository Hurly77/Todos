import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react";
import { REPEAT_DROPDOWN_OPTIONS } from "../../constants/task-dates-options";
import DateChip from "./DateChip";

export default function RepeatDropdown({ taskStates }: { taskStates: UseStateProps<Task> }) {
  const [currentTask, setCurrentTask] = taskStates;

  function handleOnClick(option: (typeof REPEAT_DROPDOWN_OPTIONS)[0]) {
    setCurrentTask((prevTask) => {
      return { ...prevTask, repeat: option.value };
    });
  }

  return (
    <Dropdown radius="sm">
      <DropdownTrigger>
        <button>
          {!currentTask?.repeat ? (
            <ArrowPathRoundedSquareIcon className="h-5 w-5 " />
          ) : (
            <DateChip date={currentTask.repeat} icon="repeat" />
          )}
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Due Date" disabledKeys={["Title"]}>
        <DropdownSection showDivider>
          <DropdownItem isReadOnly key="Title" className="opacity-100 hover:cursor-pointer">
            <h1 className="font-bold text-center">Repeat</h1>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection showDivider>
          {REPEAT_DROPDOWN_OPTIONS.map((option) => (
            <DropdownItem onClick={() => handleOnClick(option)} key={option.key}>
              {option.name}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection>
          <DropdownItem key="Custom">Custom</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
