import { BellIcon } from "@heroicons/react/24/outline";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react";
import { ABBREVIATED_DAYS, REMINDER_DROPDOWN_OPTIONS } from "../../constants/task-dates-options";

export default function ReminderDropdown({ taskStates }: { taskStates: UseStateProps<Task> }) {
  const [currentTask, setCurrentTask] = taskStates;

  function handleOnClick(option: (typeof REMINDER_DROPDOWN_OPTIONS)[0]) {
    setCurrentTask((prevTask) => {
      return { ...prevTask, reminder: option.value };
    });
  }

  const ReminderBadge = ({ reminder }: { reminder: Date }) => {
    const reminderDayIndex = reminder.getDay();

    const reminderDay = ABBREVIATED_DAYS[reminderDayIndex];

    const militaryHours = reminder.getHours();
    const hours = militaryHours > 12 ? militaryHours - 12 : militaryHours;
    const minutes = reminder.getMinutes();

    const meridiem = militaryHours > 12 ? "PM" : "AM";

    const time = `${hours}:${minutes} ${meridiem}`;

    return (
      <div className="bg-default-100 rounded flex items-center p-1 border border-default-400">
        <BellIcon className="h-5 w-5 hover:cursor-pointer" />
        <span className="text-default-foreground text-xs">
          {time}&#44; {reminderDay}
        </span>
      </div>
    );
  };

  return (
    <Dropdown radius="sm">
      <DropdownTrigger>
        <button>
          {currentTask.reminder ? (
            <ReminderBadge reminder={currentTask.reminder} />
          ) : (
            <BellIcon className="h-5 w-5 hover:cursor-pointer" />
          )}
        </button>
      </DropdownTrigger>
      <DropdownMenu selectionMode="single" aria-label="Reminder" disabledKeys={["Title"]}>
        <DropdownSection showDivider>
          <DropdownItem isReadOnly key="Title" className="opacity-100">
            <h1 className="font-bold text-center">Reminder</h1>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection showDivider>
          {REMINDER_DROPDOWN_OPTIONS.map((option) => (
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
