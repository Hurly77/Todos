import { TaskFetcherKeys } from "@/lib/sdk/constants/global-enums.";

export function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getPlaceholderTask(type: TaskFetcherKeys) {
  return {
    user_id: "",
    is_my_day: type === "my_day",
    completed: false,
    important: type === "important",
    repeat_id: null,
    repeat: null,
    reminder: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    notes: null,
    tag_id: null,
    steps: [],
    categories: {
      id: 0,
      red: false,
      blue: false,
      green: false,
      orange: false,
      purple: false,
      yellow: false,
      task_id: 0,
      created_at: "",
    },
    my_day_date: type === "my_day" ? new Date().toISOString() : null,
  };
}
