alter table "public"."tasks" drop constraint "tasks_repeat_id_fkey";

alter table "public"."tasks" add constraint "public_tasks_repeat_id_fkey" FOREIGN KEY (repeat_id) REFERENCES task_repeat(id) ON DELETE SET NULL not valid;

alter table "public"."tasks" validate constraint "public_tasks_repeat_id_fkey";


