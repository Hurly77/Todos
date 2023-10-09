import { TaskStepInsert } from "../models";
import { supabase } from "../utilities/supabase";

export default async function createTaskStep(task_id: number, title: string) {
  return await supabase
    .from("task_steps")
    .insert([{ title, task_id } as TaskStepInsert])
    .select("*")
    .single();
}
