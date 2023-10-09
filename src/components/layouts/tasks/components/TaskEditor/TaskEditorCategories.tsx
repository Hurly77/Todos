import { CheckIcon, TagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import React from "react";
import { TaskCategories } from "../../constants/enums";
import { classNames } from "@/components/layouts/app/helpers/twind-helper";
import { getCategoryBadge, getCategoryColor } from "../../helpers/task-display-helpers";
import { TaskFormat } from "@/lib/sdk/models";
import updateTaskCategories from "@/lib/sdk/methods/update-task-categories";

export default function TaskEditorCategories() {
  const { taskInEdit, setTaskInEdit } = React.useContext(TasksLayoutContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const { id, task_id, created_at, ...categories } = taskInEdit?.categories || {};
  const taskCategories = Object.entries(categories).map(([category, value]) => ({
    selected: value,
    category: category,
    text: TaskCategories[category.toUpperCase() as keyof typeof TaskCategories],
  }));

  const selectedCategories = taskCategories.filter((category) => category.selected);
  const selectedKeys = new Set(selectedCategories.map((category) => category.category));

  return (
    <div className="relative p-4 w-full dark:bg-default-100 bg-white space-y-4 text-sm  rounded-sm">
      <Dropdown isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DropdownTrigger>
          <button className="flex items-center">
            <TagIcon className="h-5 w-5 " />
            <span className="pl-2">Pick a category</span>
          </button>
        </DropdownTrigger>
        <DropdownMenu selectedKeys={selectedKeys} aria-label="Task Categories">
          {taskCategories.map((category) => (
            <DropdownItem
              textValue={category.category}
              key={category.category}
              className={classNames("w-full rounded-[4px]")}
              onClick={() => {
                if (taskInEdit && taskInEdit.categories) {
                  setTaskInEdit({
                    ...taskInEdit,
                    categories: {
                      ...taskInEdit.categories,
                      [category.category]: !category.selected,
                    },
                  });

                  updateTaskCategories(taskInEdit?.categories?.id, {
                    [category.category as keyof typeof taskInEdit.categories]: !category.selected,
                  });
                }
              }}
            >
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center gap-x-2">
                  <div className={classNames("border h-3 w-3 rounded-full", getCategoryColor(category.text))}></div>
                  <p className={""}>{category.text}</p>
                </div>
                {category?.selected && <CheckIcon className="h-4 w-4" />}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <div className="flex gap-2 flex-wrap">
        {selectedCategories.map((category) => (
          <div
            className={classNames(
              "whitespace-nowrap hover:text-foreground-50 gap-x-1 cursor-pointer flex items-center pl-2 overflow-hidden rounded border",
              getCategoryBadge(category?.text)
            )}
            key={category?.text}
          >
            <span onClick={() => setIsOpen(true)}>{category.text}</span>
            <button
              onClick={() => {
                if (taskInEdit && taskInEdit.categories) {
                  setTaskInEdit({
                    ...taskInEdit,
                    categories: {
                      ...taskInEdit.categories,
                      [category.category]: false,
                    },
                  });

                  updateTaskCategories(taskInEdit?.categories?.id, {
                    [category.category as keyof typeof taskInEdit.categories]: false,
                  });
                }
              }}
              type="button"
              className="bg-white h-full"
            >
              <XMarkIcon className="h-5 w-5 stroke-foreground" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
