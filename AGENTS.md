# AGENTS.md — pixprocoder

Personal site for Sam Kobir (`pixprocoder.com`). Single Next.js app: pages + `/api/v1`. No Express backend on the live path.

## Project info

- Next.js 16 App Router, React 19, TypeScript 5.9, Tailwind CSS v4, shadcn/ui
- Package manager: **Bun**
- Dev: `bun run dev` (turbopack)
- Build: `bun run build`
- Lint: `bun run lint`
- Keep **Framer Motion** (no GSAP). Local fonts in `src/fonts` via `src/app/fonts.ts` (no runtime Google Fonts CSS).
- Site stays dark (`.dark` on html/body). `ThemeToggle` is unused.
- Do not edit shadcn files in `src/components/ui/`. Merge classes with `cn()` from `src/lib/utils.tsx`.
- Tailwind v4: use `grow`, `size-*`, not `flex-grow`. Theme tokens in `src/app/globals.css` (`@theme inline`). `(with-layout)` pages already use `SiteWidth` (`max-w-5xl` + `px-4`); do not nest another container.

## Commands

| Script | What |
|---|---|
| `bun run dev` | Next turbopack |
| `bun run build` | Production build |
| `bun run db:generate` | `bunx prisma generate` |
| `bun run db:push` | `bunx prisma db push` |
| `bun run db:migrate` | `bunx prisma migrate dev && bunx prisma generate` |
| `bun run sync:posts` | Sync MDX slugs into the `posts` table |

`postinstall` runs `bunx prisma generate` (never `migrate dev` — that needs a local `.env` + `DIRECT_URL` and fails on Vercel). Prisma 7 does **not** generate after migrate, so `db:migrate` runs both. `prisma.config.ts` falls back to a dummy URL so generate works when env is not injected during install.

## Architecture

- `src/app/` — App Router. Live groups: `(auth)`, `(blog)`, `(with-layout)`, `api/v1`
- `src/app/api/v1/**/route.ts` — thin HTTP handlers
- `src/lib/` — domain + DB (`auth.ts`, `posts.ts`, `mail.ts`, `db/prisma.ts`, `blog-helpers.ts`, `blog-listing.ts`)
- `src/actions/` — server actions (`sync-user.ts`, `contact.ts`)
- `src/components/` — feature UI (`blog/`, `Gallery/`, `shared/`, `motion/Reveal.tsx`)
- `src/content/YYYY/MM/slug/page.mdx` — blog bodies on disk
- `src/firebase/` — Firebase client
- `src/providers/` — `AuthProviders` (Firebase), `TanStackQueryProvider`
- `src/constants/` — `navLinks`, `faqItems`, `projects`, `technologies`, `testimonials`, `galleries`, `contactInfo`
- `src/generated/prisma/` — Prisma 7 client (**gitignored**; generated on install)

**Removed (do not recreate):** `(dashboard)`, `(shop)`, `(course)`, `(projects)`, portfolio routes, Redux, RTK Query, Stripe, JWT auth, Express backend client.

### Routes

| Path | Notes |
|---|---|
| `/` | Homepage: Hero, RecentPosts, SelectedWork, Skills, Testimonials, FAQ |
| `/blog`, `/blog/[slug]` | Listing (first MDX tag as category, 9 per page) + article |
| `/gallery`, `/gallery/[id]` | Albums + lightbox |
| `/about` | From `Sam Kobir.md` |
| `/contact` | Form + Turnstile + nodemailer |
| `/saved` | Bookmarked posts (Firebase uid) |
| `/privacy`, `/terms` | Legal |
| `/login`, `/signup` | Firebase Google / GitHub only |

`navLinks`: Home, Blog, Gallery, About, Contact. Navbar also links Saved when signed in.

## Data and auth

- **Auth:** Firebase Google + GitHub. `user.uid` is the app user key. Login syncs via `syncFirebaseUser` → `users.uid`. `username` is a unique single-word handle from display name (`sam_kobir`, regex `^[a-z0-9]+(?:_[a-z0-9]+)*$`).
- **Posts:** MDX on disk. Postgres `posts` table is slug + `views` + engagement relations only. After a new MDX file, `bun run sync:posts` (secret: `POST_SYNC_SECRET` or `NEXT_PUBLIC_POST_SYNC_SECRET`).
- **Engagement:** likes, bookmarks, comments, views in Neon. Unique like/bookmark `(userId, slug)` where `userId` is Firebase uid. Comments: `authorId` = uid. Views increment with post upsert (`src/lib/posts.ts`).
- **Comments (shipped):** one-level threads only. `parentId` always the **root**. Main list paginated 10 (`ROOT_COMMENT_PAGE_SIZE`). Max 10 replies per root (`MAX_REPLIES_PER_THREAD`). Max comment length **2000** (`MAX_COMMENT_LENGTH`). GET `/api/v1/posts/comments/[slug]` returns roots with `replies[]`, plus `likeCount`/`isLiked` on roots (`?userId=`). Reply prefix `@handle. ` (`mentionPrefix` in `src/lib/comment-limits.ts`). Parent byline has no `@`; nested names and `@handle` in bodies are `text-primary`. Unique handle `username` (`^[a-z0-9]+(?:_[a-z0-9]+)*$`).
- **Write auth:** POST comment, post like, and comment like require `Authorization: Bearer <Firebase ID token>`. Server verifies with Google JWKS (`src/lib/firebase-token.ts`, `jose`) and uses `token.sub` as uid. Body `userId` / `authorId` are ignored. No Firebase Admin / service account. Bookmarks and views stay as they were.
- **Comment likes:** parent comments only (`CommentLike` / `comment_likes`, unique `(userId, commentId)`). Replies cannot be liked (API 400). GET/POST `/api/v1/posts/comments/like/[id]` same shape as post likes (`isLiked` + `count`). Heart + count on the parent card and in the thread modal. Optimistic UI in `CommentThread`.
- **Comment skeletons:** `CommentListSkeleton` in `CommentThread.tsx` — three cards matching avatar/name/lines/like/reply. Shimmer is `.skeleton-shimmer` in `globals.css` (do not use shadcn `Skeleton` here: `bg-muted` matches `bg-card` in dark). Do not edit `src/components/ui/skeleton.tsx`.
- **Likes UI (posts):** Zustand optimistic cache; Neon rows are source of truth.
- **Prisma is Node-only.** Never import `src/lib/db/prisma.ts` from `'use client'` files.

`getBaseURL()` in `src/utils` uses `NEXT_PUBLIC_API_URL` or `/api/v1`.

## Database (Neon Postgres + Prisma 7)

Migrated off MongoDB Atlas. Prisma **7.10.1** (not 8 RC). Mongo is unsupported in Prisma 7.

- Schema: `prisma/schema.prisma` — `provider = "postgresql"`
- Config: `prisma.config.ts` — CLI URL is `DIRECT_URL` or falls back to `DATABASE_URL` (so Vercel generate works with pooler only)
- Runtime: `src/lib/db/prisma.ts` — `PrismaNeon` adapter + pooled `DATABASE_URL`
- Client output: `src/generated/prisma` (import `PrismaClient` / `Role` from there, or `Role` re-exported from `src/lib/db/prisma.ts`)
- Initial migration: `prisma/migrations/20261015223305_init`
- Later: `20261016011500_unique_username`, `20261016020000_short_fallback_usernames`, `20261016123000_comment_likes`

**Two Neon URLs, one database:**

| Var | Host | Used by |
|---|---|---|
| `DATABASE_URL` | `…-pooler…` + `pgbouncer=true` + `sslmode=require` | App / Prisma Client / Vercel |
| `DIRECT_URL` | same hostname **without** `-pooler` | Local `migrate` / `db push` |

Do not use `channel_binding=require`. Do not duplicate `DATABASE_URL` across `.env` and `.env.local` with different values.

`.env` and `.env.local` are gitignored. `.env.example` is tracked. Prisma CLI loads `.env`; Next.js loads `.env` then `.env.local`. Restart `bun run dev` after changing `DATABASE_URL`.

Schema is Postgres-valid but still Mongo-shaped: copied PKs are ObjectId hex; new rows use `cuid()`; likes/bookmarks/comments join User by **uid** and Post by **slug**. `User.password` and optional `Post.userId` are leftovers. Tighten FKs in a later migration, not in the same pass as features.

## Environment variables

Server: `DATABASE_URL`, `DIRECT_URL` (local migrate), `SMTP_USER`, `SMTP_PASS`, `TURNSTILE_SECRET_KEY`, `POST_SYNC_SECRET`

Public: `NEXT_PUBLIC_API_URL` (`/api/v1`), `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_FIREBASE_*`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`, `NEXT_PUBLIC_CLOUDFLARE_BEACON_TOKEN`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_POST_SYNC_SECRET`

Vercel production: set **only** pooled `DATABASE_URL`. Do not put Mongo URLs back.

## Key conventions

- Blog listing: `tags[0]` is the category (`src/lib/blog-listing.ts`). `BLOG_PAGE_SIZE` is 9.
- Article: `ArticleReactions` order is views, like, comments, save, share. Share uses Radix dropdown + real `<a>` links (not `window.open`). `ActionButton` must forward refs/props. Related posts: up to 3 after reactions (`getRelatedPosts` — same primary tag, then tag overlap, then newest). Compact horizontal snap carousel (`RelatedPosts`), not a grid.
- Contact: Turnstile + `src/lib/mail.ts`.
- Support: `BUY_ME_A_COFFEE_URL` in `src/constants`. `SupportCta` on article (after reactions), About (outline next to resume/contact), footer Connect. Native button, opens BMC in a new tab. Do not use the yellow BMC image widget.
- Motion: `src/components/motion/Reveal.tsx`.
- New APIs belong in this Next app under `src/app/api/v1`.
- Toasts: **Sonner** (`toast.success` / `error` / `warning` / `info`). `<Toaster />` from `src/components/ui/sonner.tsx`. Auto-close 4s, `richColors`.
- Auth return path: `?next=` via `src/lib/auth-redirect.ts`. Navbar Sign in and login-required actions pass the current page. After Google/GitHub, `router.replace` that path (relative `/…` only).
- Daily work log: `docs/log/YYYY-MM-DD.md` — short feature/fix bullets only.

## Still open

- Comment rate limit / Turnstile on CommentBox (not shipped). Reply likes not requested.
- Optional schema cleanup: uid/slug FKs → `User.id` / `Post.id`, drop `password` / unused `Post.userId`
- Leftover Vercel env (`JWT_ACCESS_TOKEN`, Stripe) if still present
- Drop Atlas only if `pixprocoder-backend` is retired too

## Recent work (2026)

1. **Unified app** — Next.js frontend + API in one repo. Firebase Google/GitHub only. Shop, dashboard, courses, portfolio routes, Redux, Stripe, JWT, Express client removed.
2. **Restyle** — terminal/CLI look → premium dark theme (TweakCN tokens, local fonts, Framer Motion). Homepage, blog listing/article, gallery, about, contact, FAQ, privacy/terms.
3. **Engagement** — views (upsert Post), likes, comments, bookmarks, `/saved`.
4. **Prisma 7 + Neon** — left Prisma 6 + Mongo because Prisma 7 has no Mongo. Rewrote schema for PostgreSQL, `prisma.config.ts`, Neon adapter. Empty tables via `migrate dev`, copied Atlas → Neon (71 users, 8 posts, 12 likes, 2 bookmarks, 40 comments). Local and prod `DATABASE_URL` are Neon pooler. Mongo driver, copy script, and `MONGO_DATABASE_URL` removed. Atlas cluster is unused by this app (drop only if `pixprocoder-backend` is retired too).
5. **Auth + toasts** — login/signup restyled; return to `?next=` after Google/GitHub. Sonner toasts with auto-close and success/error/warning/info. Daily log in `docs/log/`.
6. **Comments** — one-level threads (Reply + modal, 10 roots/page, max 10 replies). Unique `username` handle. Parent-comment likes (Heart + count). `@handle` primary color. Shimmer skeleton cards matching the comment layout. User confirmed this slice is done (2026-10-16).

