import { Database } from "../constants/supabase-types";
import { supabase } from "../utilities/supabase";

export default async function updateTaskCategories(
  id: number,
  categories: Database["public"]["Tables"]["task_tag"]["Update"]
) {
  await supabase.from("task_tag").update(categories).eq("id", id);
}
