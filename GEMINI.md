# PixProcoder Brand Hub: Design & Engineering Standards

This document serves as the foundational mandate for the PixProcoder ecosystem. All future development, refactoring, and content creation must strictly adhere to these standards to maintain brand integrity and technical excellence.

## 1. Core Vision
PixProcoder is not a traditional portfolio; it is a **Professional Brand Hub** and **Technical Studio**. The site exists to showcase engineering authority, sell premium digital products (Shop/Courses), and share high-impact insights (Blog).

## 2. Design Language: "Programmer UI"
The visual identity is rooted in the tools and environments of a software engineer.
*   **Theme:** **Strict Dark Mode Only**. No light mode toggle.
*   **Primary Palette:** 
    *   Background: `#0d1117` (GitHub Dark)
    *   Primary: HSL Primary (Cyan/Blue focus)
    *   Accents: Monospace text in secondary colors (Green for status, Purple for tech, etc.)
*   **Typography:**
    *   Headings: Bold, tracking-tight, often featuring a monospace "technical suffix" (e.g., `portfolio_work`).
    *   Accents: **JetBrains Mono** or equivalent monospace font for all technical metadata, function calls, and terminal prompts.
*   **Aesthetics:** High-contrast minimalist, subtle backdrop blurs (vibrancy), and "rounded-3xl" or "rounded-full" pill-style containers.

## 3. Component Standards
*   **Smart Navbar:** Floating, centered "pill" design. Must implement the "Hide on Scroll Down / Show on Scroll Up" behavior using `framer-motion`.
*   **Bento Grid:** Used for high-level "Active" content on the homepage to mix blog, products, and social proof.
*   **Infinite Carousels:** Used for Portfolio and Testimonials. Must be slow, cinematic, and use native CSS animations for performance, with an instant `pause-on-hover` state.
*   **System Docs FAQ:** Accordions must be styled as technical documentation with `[ Q ]` and `[ A ]` indicators.
*   **Section Headers:** Consistent format: `Selected <span className="text-primary font-mono italic">module_name</span>`. Breadcrumbs should use terminal paths (e.g., `~/insights/articles`, `~/gateway/contact`).

## 4. Blog & Content Standards
*   **Blog Cards:** Must feature a "Repository Header" with version tags (e.g., `article_v1.0`) and functional footers (e.g., `READ_MORE`).
*   **Single Article Layout:**
    *   **Metadata:** Monospace row for date, author (using `@handle`), read time, and view stats.
    *   **Sidebar:** Sticky interaction panel for "User Interaction" (Likes/Reviews) and Social Sharing.
    *   **Status Badges:** Include technical indicators for `Status: Published` and `Log ID`.
*   **Peer Reviews (Comments):** Style comments as engineering logs with monospace handles and function-call replies (`sys_reply()`).
*   **Prose (Typography):** Dark-mode optimized with `#0d1117` code block backgrounds and high-contrast technical headings.

## 5. Gateway & Auth Standards (Contact/Login/Signup)
*   **Breadcrumbs:** Always include technical directory paths (e.g., `~/gateway/auth/login`).
*   **Technical Labels:** Use snake_case or technical terminology for form labels (e.g., `User_Auth`, `Security_Token`, `Subject_Header`).
*   **Execution Buttons:** Primary actions must use the `EXEC_` prefix (e.g., `EXEC_SIGN_IN`, `EXEC_SEND_MESSAGE`).
*   **Status Modules:** Include system status indicators (e.g., `CONNECTION_STABLE`, `ENCRYPTION_ACTIVE_AES_256`).
*   **Feedback Logs:** Toast notifications and success messages should use technical terminology (e.g., `TRANSMISSION_SUCCESS`, `AUTH_SUCCESS`).

## 6. Engineering & Performance
*   **Framework:** Next.js 15 (App Router) + React 19.
*   **Runtime:** Bun.
*   **Styling:** Tailwind CSS (Vanilla CSS preferred for custom animations).
*   **Spacing:** Global container padding is strictly **1rem (16px)**.
*   **Mobile-First:** All components must be fully responsive, with touch-friendly targets (min 44px) and fluid typography.
*   **Animations:** Use `framer-motion` for interaction-heavy elements and native CSS for continuous background animations.

## 7. Workflow Instructions for Future Sessions
*   **Maintain the "System Log" Vibe:** When adding new features, ask: "Does this look like it belongs in an IDE or a Terminal?"
*   **Content over Bio:** Prioritize showcasing what PixProcoder **builds and thinks** over personal biography.
*   **Surgical Edits:** Maintain the 16px container spacing and avoid redundant `px-4` classes on nested containers.
*   **Dark Mode Consistency:** Ensure all new components use the `#0d1117` or `muted/20` background strategy with `white/10` borders.

---
*Last Updated: March 2026*
