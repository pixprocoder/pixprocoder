# AGENTS.md — pixprocoder (Frontend)

## Project info
- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, shadcn/ui
- Package manager: Bun
- Dev: `bun run dev` (turbopack)
- Build: `bun run build`
- Lint: `bun run lint`

## Architecture
- `src/app/` — App Router pages (route groups: `(with-layout)`, `(blog)`, `(shop)`, `(course)`, `(dashboard)`)
- `src/components/` — React components (shared/, ui/ (shadcn), feature components)
- `src/lib/` — Utilities (`blog-helpers.ts`, `utils.tsx`, `analytics.ts`)
- `src/redux/` — Redux store, slices, RTK Query API slices
- `src/providers/` — Auth, Redux, TanStack Query, Theme providers
- `src/helpers/` — Auth helpers (`auth.helper.ts`)
- `src/types/` — TypeScript interfaces
- `src/constants/` — Static data (navLinks, projects, skills, etc.)
- `src/content/` — MDX blog posts (`YYYY/MM/slug/page.mdx`)
- `src/firebase/` — Firebase init
- `src/hooks/` — Custom hooks
- `src/routes/` — PrivateRoute, AdminRoute guards

## State management
- Redux Toolkit: cart slice (localStorage), like slice (localStorage)
- RTK Query: `PostApiSlice`, `UserApiSlice`, `EmailApiSlice` (backend at `/api/v1`)
- Context: AuthContext (Firebase), TransactionContext (payment)
- TanStack Query provider also available

## Backend API
- Base URL: `NEXT_PUBLIC_API_URL` (default `http://localhost:3003/api/v1`)
- Auth: Firebase → `POST /api/v1/jwt` → JWT stored in localStorage under `accessToken`

## Key conventions
- shadcn/ui components in `src/components/ui/` — do not edit directly
- RTK Query base query already configured with base URL; add endpoints to existing slices
- Blog posts are MDX files in `src/content/` — use `lib/blog-helpers.ts` to read them
- Use `cn()` from `src/lib/utils.tsx` for className merging
- Dark mode via `next-themes` using class strategy

## Environment variables
- `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_STRIPE_PK`, `NEXT_PUBLIC_FIREBASE_*`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_BACKEND_URL`, `NEXT_PUBLIC_POST_SYNC_SECRET`