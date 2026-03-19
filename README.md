# Hola 👋 It's Sam!

[![Website](https://img.shields.io/badge/Website-pixprocoder-blue)](https://pixprocoder.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-pixprocoder-blue)](https://www.linkedin.com/in/pixprocoder/)
[![Codepen](https://img.shields.io/badge/Codepen-pixprocoder-black)](https://codepen.io/pixprocoder)
[![Instagram](https://img.shields.io/badge/Instagram-pixprocoder-E4405F?logo=instagram&logoColor=white)](https://instagram.com/pixprocoder)

Founder CEO of [pixprocoder-studio](https://pixprocoder-studio.com). Full-stack Software Engineer.

## 🚀 Technologies & Tools I use the most

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00)
![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MDX](https://img.shields.io/badge/MDX-1B1F24?style=for-the-badge&logo=mdx&logoColor=white)

### Backend & Database

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-ffaa00?style=for-the-badge&logo=Firebase&logoColor=white)
![Convex](https://img.shields.io/badge/Convex-000000?style=for-the-badge&logo=convex&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

### Tools & Libraries

![Framer Motion](https://img.shields.io/badge/Framer_Motion-000000?style=for-the-badge&logo=framer&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)

## 🌟 Key Features of My Website

- **Dynamic Content Management**: Built with Next.js for optimal performance
- **Dark/Light Mode**: Seamless theme switching based on user preference
- **Responsive Design**: Fully responsive across all devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Markdown Support**: MDX integration for rich content creation
- **Performance Optimized**: Leveraging Next.js features for fast loading

## 📈 What I'm Currently Working On

- Expanding my personal website with more dynamic features
- Building interactive web experiences with React and TypeScript
- Exploring advanced Next.js patterns and optimizations
- Contributing to open-source projects

## 🛠️ Getting Started

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/pixprocoder/pixprocoder.git

# Navigate to the project directory
cd pixprocoder

# Install dependencies
bun install

# Run the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📊 Analytics Setup

This project uses **Google Analytics 4 (GA4)** + **Firebase Analytics** for tracking user behavior and Google Ads integration.

### Environment Variables

Add your GA4 Measurement ID to `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Usage Examples

**Track custom events:**
```tsx
import { useAnalytics } from '@/src/hooks/useAnalytics';

function MyComponent() {
  const { trackEvent, trackFormSubmit, trackOutboundLink } = useAnalytics();

  const handleClick = () => {
    trackEvent('button_click', { button_name: 'signup', location: 'hero' });
  };

  const handleFormSubmit = (success: boolean) => {
    trackFormSubmit('contact_form', success);
  };

  return (
    <button onClick={handleClick}>Sign Up</button>
  );
}
```

**Track e-commerce events:**
```tsx
const { trackAddToCart, trackPurchase } = useAnalytics();

// Add to cart
trackAddToCart('product_123', 'T-Shirt', 29.99, 2);

// Purchase
trackPurchase('txn_123', 59.98, [
  { item_id: 'product_123', item_name: 'T-Shirt', quantity: 2 }
]);
```

**Use pre-tracked components:**
```tsx
import { TrackedLink, TrackedButton } from '@/src/components/TrackedElements';

<TrackedLink href="https://external.com">External Link</TrackedLink>
<TrackedButton eventName="signup_click">Sign Up</TrackedButton>
```

### Available Tracking Functions

| Function | Description |
|----------|-------------|
| `trackEvent(name, params)` | Track any custom event |
| `trackPageView(url, title)` | Track page view |
| `trackOutboundLink(url, text)` | Track outbound link clicks |
| `trackFormSubmit(name, success)` | Track form submissions |
| `trackSearch(term, count)` | Track search queries |
| `trackAddToCart(id, name, price, qty)` | Track add to cart |
| `trackPurchase(txnId, value, items)` | Track purchases |

### Google Ads Integration

GA4 is configured for Google Ads conversion tracking. Link your GA4 property to Google Ads in the Google Analytics admin panel.

## 📄 License

Licensed under the [MIT license](/LICENSE).
