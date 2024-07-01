alter table "public"."tasks" drop constraint "tasks_user_id_fkey";

alter table "public"."tasks" add constraint "public_tasks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "public_tasks_user_id_fkey";


