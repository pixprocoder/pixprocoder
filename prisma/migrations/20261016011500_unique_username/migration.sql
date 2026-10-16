-- Slugify existing names into a single-word handle
UPDATE "users"
SET "username" = lower(
  regexp_replace(
    regexp_replace(trim(both from coalesce("username", '')), '[^a-zA-Z0-9]+', '_', 'g'),
    '^_+|_+$',
    '',
    'g'
  )
);

UPDATE "users"
SET "username" = 'user'
WHERE "username" IS NULL OR "username" = '';

-- Make collisions unique using the row id
WITH ranked AS (
  SELECT id, username,
    ROW_NUMBER() OVER (PARTITION BY username ORDER BY id) AS rn
  FROM "users"
)
UPDATE "users" AS u
SET "username" = left(u.username, 16) || '_' || lower(regexp_replace(u.id, '[^a-zA-Z0-9]', '', 'g'))
FROM ranked AS r
WHERE u.id = r.id AND r.rn > 1;

CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
