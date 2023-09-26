import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  PopoverTrigger,
  PopoverContent,
  Popover,
  Input,
  Select,
  SelectItem,
  Button,
  ButtonGroup,
} from "@nextui-org/react";
import {
  DAYS_OF_WEEK_ABBREVIATED_TWO_LETTERS,
  REPEAT_DROPDOWN_OPTIONS,
  REPEAT_TIME_CATEGORY_OPTIONS,
} from "../../constants/task-dates-options";
import DateChip from "./TaskTilesDateChip";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import React from "react";

export default function RepeatDropdown() {
  const { currentTaskStates, datePickerStates } = React.useContext(TasksLayoutContext);
  const [currentTask, setCurrentTask] = currentTaskStates;
  const [datePickerOpen, setDatePickerOpen] = datePickerStates;

  const [timeCategory, setTimeCategory] = React.useState("days" as "days" | "weeks" | "months" | "years");
  const [numberOfRepeats, setNumberOfRepeats] = React.useState(1);
  const [dayOfTheWeek, setDayOfTheWeek] = React.useState([] as number[]);

  function handleOnClick(option: (typeof REPEAT_DROPDOWN_OPTIONS)[0]) {
    setCurrentTask((prevTask) => {
      return { ...prevTask, repeat: option.value };
    });
  }

  return (
    <>
      {datePickerOpen !== "repeat" ? (
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
              <DropdownItem onClick={() => setDatePickerOpen("repeat")} key="Custom">
                Custom
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Popover isOpen={datePickerOpen === "repeat"} placement="bottom" showArrow radius="sm">
          <PopoverTrigger>
            <button>
              <DateChip date={currentTask.repeat} icon="repeat" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col items-center space-y-4 py-2">
            <div className="flex gap-x-2">
              <Input
                min={1}
                size="sm"
                radius="sm"
                type="number"
                labelPlacement="outside"
                onChange={(e) => setNumberOfRepeats(parseInt(e.target.value))}
                value={numberOfRepeats?.toString()}
              />
              <Select defaultSelectedKeys={["days"]} radius="sm" size="sm" labelPlacement="outside">
                {REPEAT_TIME_CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option.key} onClick={() => setTimeCategory(option.key)}>
                    {option.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            {timeCategory === "weeks" && (
              <ButtonGroup size="sm" radius="sm">
                {DAYS_OF_WEEK_ABBREVIATED_TWO_LETTERS.map((day, idx) => (
                  <Button
                    isIconOnly
                    className="w-0 p-0 m-0"
                    key={day}
                    radius="sm"
                    color={dayOfTheWeek.includes(idx) ? "primary" : "default"}
                    onClick={() => {
                      if (dayOfTheWeek.includes(idx)) {
                        setDayOfTheWeek((prevDays) => prevDays.filter((prevDay) => prevDay !== idx));
                      } else {
                        setDayOfTheWeek((prevDays) => [...prevDays, idx]);
                      }
                    }}
                  >
                    {day}
                  </Button>
                ))}
              </ButtonGroup>
            )}
            <Button
              isDisabled={timeCategory === "weeks" && dayOfTheWeek.length === 0}
              radius="sm"
              color="primary"
              onPress={() => {
                setDatePickerOpen(null);
                setCurrentTask((prevTask) => ({
                  ...prevTask,
                  repeat: {
                    interval: numberOfRepeats,
                    type: timeCategory,
                    days: dayOfTheWeek as (0 | 1 | 2 | 3 | 4 | 5 | 6)[],
                  },
                }));
              }}
            >
              Save
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
