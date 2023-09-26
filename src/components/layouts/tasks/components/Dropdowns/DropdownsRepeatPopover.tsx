import { Select, SelectItem, ButtonGroup, Button, Input } from "@nextui-org/react";
import { REPEAT_TIME_CATEGORY_OPTIONS, DAYS_OF_WEEK_ABBREVIATED_TWO_LETTERS } from "../../constants/task-dates-options";
import React from "react";

type DropdownsRepeatPopoverProps = {
  onSave: (props: { interval: number; type: "days" | "weeks" | "months" | "years"; days: number[] }) => void;
};
export default function DropdownsRepeatPopover({ onSave }: DropdownsRepeatPopoverProps) {
  const [timeCategory, setTimeCategory] = React.useState("days" as "days" | "weeks" | "months" | "years");
  const [numberOfRepeats, setNumberOfRepeats] = React.useState(1);
  const [dayOfTheWeek, setDayOfTheWeek] = React.useState([] as number[]);

  return (
    <>
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
                if (dayOfTheWeek.includes(idx as 0 | 1 | 2 | 3 | 4 | 5 | 6)) {
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
        onPress={() => onSave({ type: timeCategory, interval: numberOfRepeats, days: dayOfTheWeek })}
      >
        Save
      </Button>
    </>
  );
}
