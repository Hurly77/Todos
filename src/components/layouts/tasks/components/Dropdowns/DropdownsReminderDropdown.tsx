import { BellIcon } from "@heroicons/react/24/outline";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { ABBREVIATED_DAYS, REMINDER_DROPDOWN_OPTIONS } from "../../constants/task-dates-options";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import React from "react";
import ReactDatePicker, { ReactDatePickerCustomHeaderProps, ReactDatePickerProps } from "react-datepicker";
import DropdownsTriggerDisplay from "./DropdownsTriggerDisplay";
import DropdownsDatePickerPopover from "./DropdownsDatePickerPopover";

export default function DropdownsReminderDropdown(props: TaskSpecificDropdownsProps) {
  const { placeholder, hasChip, setTask, task, datePickerOpen, setDatePickerOpen } = props;
  const ctx = React.useContext(TasksLayoutContext);

  function handleOnClick(option: (typeof REMINDER_DROPDOWN_OPTIONS)[0]) {
    if (task) return setTask({ ...task, reminder: option.value });
  }

  return (
    <>
      {datePickerOpen !== "reminder" ? (
        <Dropdown radius="sm">
          <DropdownTrigger>
            <button>
              <DropdownsTriggerDisplay
                placeholder={placeholder}
                hasChip={hasChip}
                icon="bell"
                date={task?.reminder || null}
              />
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
              <DropdownItem onClick={() => setDatePickerOpen("reminder")} key="Custom">
                Custom
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Popover
          radius="sm"
          isOpen={datePickerOpen === "reminder"}
          onClose={() => setDatePickerOpen(null)}
          showArrow
          classNames={{
            base: "p-0 m-0 pb-2 bg-white dark:bg-white",
          }}
        >
          <PopoverTrigger>
            <button>
              <DropdownsTriggerDisplay hasChip={!!task?.reminder} icon="bell" date={task?.reminder || null} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="space-y-4">
            <DropdownsDatePickerPopover
              date={task?.reminder ?? null}
              onSave={() => setDatePickerOpen(null)}
              handleChange={(date) => {
                if (task) setTask({ ...task, reminder: date as Date });
              }}
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
