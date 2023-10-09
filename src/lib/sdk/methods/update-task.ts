import { TaskFormat, TaskUpdate } from "../models";
import { supabase } from "../utilities/supabase";

export async function updateTask(task: TaskUpdate) {
  if (task.id) {
    await supabase.from("tasks").update(task).eq("id", task.id);
  }
}
