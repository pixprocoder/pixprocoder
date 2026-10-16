-- Shorten user_<longObjectId> to user_<last4>
UPDATE "users"
SET "username" = 'user_' || right(regexp_replace("username", '^user_', ''), 4)
WHERE "username" ~ '^user_[a-z0-9]{8,}$';

-- Resolve any collisions from shortening
WITH ranked AS (
  SELECT id, username,
    ROW_NUMBER() OVER (PARTITION BY username ORDER BY id) AS rn
  FROM "users"
)
UPDATE "users" AS u
SET "username" = u.username || '_' || r.rn::text
FROM ranked AS r
WHERE u.id = r.id AND r.rn > 1;
