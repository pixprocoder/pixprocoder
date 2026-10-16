import "dotenv/config";
import { defineConfig } from "prisma/config";

// generate (Vercel postinstall) does not need a live DB.
// migrate/dev locally uses DIRECT_URL from .env, then DATABASE_URL.
const url =
  process.env.DIRECT_URL ||
  process.env.DATABASE_URL ||
  "postgresql://unused:unused@localhost:5432/unused";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url,
  },
});
