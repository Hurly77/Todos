-- Inserting data into the auth.users table
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  invited_at, confirmation_token, confirmation_sent_at, recovery_token,
  recovery_sent_at, email_change_token_new, email_change, email_change_sent_at,
  last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin,
  created_at, updated_at, phone, phone_confirmed_at, phone_change,
  phone_change_token, phone_change_sent_at, email_change_token_current,
  email_change_confirm_status, banned_until, reauthentication_token,
  reauthentication_sent_at
)
VALUES
(
  '00000000-0000-0000-0000-000000000000', '5899f99d-a449-4bfa-8769-19c097aaf1f5',
  'authenticated', 'authenticated', 'camrbo@gmail.com',
  '$2a$10$MbiyHEJGcZPEAht7PhiBsOnD1D01jFV/vnCZnSFoXu8i1h4IcN6wS',
  '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL,
  '{"provider": "email", "providers": ["email"]}', '{}', NULL,
  '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL,
  '', '', NULL, '', 0, NULL, '', NULL
);

-- Inserting data into the auth.identities table
INSERT INTO auth.identities (
  id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
)
VALUES
(
  'bdd7000c-bb95-44bb-9a38-c7816208b4e7', '5899f99d-a449-4bfa-8769-19c097aaf1f5', '5899f99d-a449-4bfa-8769-19c097aaf1f5'::uuid,
  '{"sub": "5899f99d-a449-4bfa-8769-19c097aaf1f5"}', 'email',
  '2022-10-04 04:45:00.000+00', '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00'
);
