# Work Log

## 2026-03-19

### Session: Project Review & Setup

- Reviewed project structure and configuration
- Project is a personal portfolio/blog website built with Next.js 15, React 19, TypeScript, and Tailwind CSS
- Uses MDX for blog content, Firebase for analytics, Stripe for payments
- Noted potential issue: `ignoreBuildErrors: true` in `next.config.js` should be addressed
- Noted redundant syntax highlighting dependencies (highlight.js, lowlight, prismjs, react-syntax-highlighter, refractor)

### Session: Google Analytics 4 Setup

**Goal:** Set up GA4 for user analytics + Google Ads integration

**Files Created:**
- `src/lib/analytics.ts` - GA4 utility functions (pageview, events, ecommerce, engagement tracking)
- `src/hooks/useAnalytics.ts` - React hook for easy analytics access
- `src/components/TrackedElements.tsx` - Pre-tracked Link and Button components

**Files Modified:**
- `.env.example` - Added `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-F748G1TSPN`
- `src/app/layout.tsx` - Added GA4 gtag script with Next.js Script component
- `src/components/PageViewTracker.tsx` - Enhanced to track both GA4 + Firebase
- `src/firebase/firebase.init.ts` - Fixed Firebase Analytics lazy initialization
- `README.md` - Added analytics documentation section

**Features Implemented:**
- Automatic page view tracking on route changes
- Custom event tracking via `useAnalytics` hook
- Pre-built engagement events (outbound links, downloads, form submits, search, newsletter)
- E-commerce events (view item, add to cart, checkout, purchase)
- TrackedLink and TrackedButton components for automatic tracking
- Dual tracking: GA4 + Firebase Analytics (both work together)

**Measurement ID:** `G-F748G1TSPN`

**Testing:**
- ✅ GA4 working in Safari
- ⚠️ Brave browser blocks GA4 by default (Shields feature)
- Solution: Use Safari for testing or disable Brave Shields for localhost

**Next Steps:**
1. Verify tracking in GA4 Real-Time reports (use Safari)
2. Link GA4 property to Google Ads for conversion tracking
3. Add custom events to key user actions (signups, purchases, etc.)

### Session: Google AdSense Integration

**Goal:** Add Google AdSense for monetization

**Files Created:**
- `public/ads.txt` - AdSense authorization file with publisher ID
- `src/components/AdSense.tsx` - Manual ad placement component
- `src/components/AdSenseAutoAds.tsx` - Auto ads component

**Files Modified:**
- `.env.example` - Added `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-4097711579904962`
- `src/app/layout.tsx` - Added AdSense script + AutoAds component
- `README.md` - Added AdSense documentation

**Publisher ID:** `ca-pub-4097711579904962`

**Features:**
- Auto Ads enabled site-wide (Google automatically places ads)
- Manual ad component for custom placements
- Support for all ad formats (auto, fluid, rectangle, horizontal, vertical)

**Next Steps:**
1. Deploy site to make `ads.txt` accessible
2. Submit site to Google AdSense for approval
3. After approval, create ad units in AdSense dashboard
4. Add ad slots to blog posts, sidebar, etc.

---
