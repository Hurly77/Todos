import { TaskFetcherKeys } from "../constants/global-enums.";
import { TaskRepeatInsert } from "../models/TaskModel";
import { supabase } from "../utilities/supabase";

export default async function taskCreator({ task, type }: { task: Task; type?: TaskFetcherKeys }) {
  const { repeat, date, title, reminder } = task;

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  const isMyDay = type === "my_day";
  const isPlanned = type === "planned";
  const isImportant = type === "important";
  const dueDate = date ? date : !date && isPlanned ? new Date() : null;

  const taskData = {
    title,
    completed: false,
    is_my_day: isMyDay,
    important: isImportant,
    user_id: user?.id as string,
    date: dueDate?.toISOString() ?? null,
    reminder: reminder?.toISOString() || null,
    my_day_date: isMyDay ? new Date(new Date().setHours(0, 0, 0, 0)).toISOString() : null,
  };

  const { data: newTask } = await supabase.from("tasks").insert([taskData]).select("id")?.single();

  const repeatId = repeat && newTask?.id ? await createRepeat({ ...repeat, task_id: newTask?.id }) : null;
  const tagId = newTask?.id ? await createCategories(newTask?.id) : null;

  const { data: updatedTask } = await supabase
    .from("tasks")
    .update({ tag_id: tagId, repeat_id: repeatId })
    .match({ id: newTask?.id })
    .select("*");

  return updatedTask;
}

async function createRepeat(repeat: TaskRepeatInsert) {
  if (!repeat) return null;

  const { data, error } = await supabase.from("task_repeat").insert(repeat).select("id").single();
  if (error) throw new Error(error.message);

  return data?.id;
}

async function createCategories(taskId: number) {
  const categoriesData = { task_id: taskId };

  const { data, error } = await supabase.from("task_tag").insert([categoriesData]).select("id").single();
  if (error) throw new Error(error.message);

  return data?.id;
}
