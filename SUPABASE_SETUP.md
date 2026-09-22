# Supabase / Railway setup

The code now stores workshop data in Supabase and uploads selected workshop images to the public `workshop-images` bucket.

## Supabase

The code accepts either a table named `workshops` or `workshop` with these columns:

- `id` — bigint / identity / primary key
- `created_at` — timestamptz, default `now()`
- `data` — jsonb

The `workshop-images` bucket should be Public.

No public INSERT/UPDATE/DELETE RLS policies are required because writes go through the Railway server using the Supabase secret key.

## Railway variables

Keep the existing:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY` (harmless to keep; the new workshop API does not need it)

Add:

- `SUPABASE_SECRET_KEY` — Supabase secret/server key. Never prefix this with `VITE_`.
- `ADMIN_PASSWORD` — the password you want to use for `/admin`.

Optional:

- `SUPABASE_WORKSHOPS_TABLE` — only if your table is not named `workshops` or `workshop`.
- `SUPABASE_WORKSHOP_BUCKET` — only if your bucket is not named `workshop-images`.
- `ADMIN_SESSION_SECRET` — optional extra random secret. If omitted, the server derives the admin session signature from `SUPABASE_SECRET_KEY`.

After adding the variables, redeploy Railway.

## First admin visit after deploy

If Supabase has no workshop snapshot yet, the admin page automatically migrates the existing `kp_workshops_v1` list from that browser's localStorage to Supabase. Any old base64 workshop image is uploaded to the `workshop-images` bucket automatically.
