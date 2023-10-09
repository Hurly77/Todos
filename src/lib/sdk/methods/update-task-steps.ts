import { TaskStepUpdate } from "../models";
import { supabase } from "../utilities/supabase";

export async function updateTaskStep(step: TaskStepUpdate) {
  if (step.id) {
    await supabase.from("task_steps").update(step).eq("id", step.id);
  }
}
