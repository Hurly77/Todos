drop policy "Enable all for all users" on "public"."test_data";

drop policy "Enable read access for all users" on "public"."test_data";

alter table "public"."test_data" drop constraint "test_data_pkey";

drop index if exists "public"."test_data_pkey";

drop table "public"."test_data";


