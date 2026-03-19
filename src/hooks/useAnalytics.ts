'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { event, pageview, engagementEvents, ecommerceEvents } from '@/src/lib/analytics';

/**
 * Google Analytics Hook
 * Provides easy access to GA4 tracking functions
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { trackEvent } = useAnalytics();
 * 
 *   const handleClick = () => {
 *     trackEvent('button_click', { button_name: 'signup' });
 *   };
 * 
 *   return <button onClick={handleClick}>Sign Up</button>;
 * }
 * ```
 */
export function useAnalytics() {
  /**
   * Track custom events
   * @param eventName - Name of the event
   * @param params - Event parameters
   */
  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    event(eventName, params);
  };

  return {
    trackEvent,
    trackPageView: (url: string, title?: string) => pageview(url, title),
    // Engagement events
    trackOutboundLink: engagementEvents.outboundLink,
    trackDownload: engagementEvents.download,
    trackFormSubmit: engagementEvents.formSubmit,
    trackSearch: engagementEvents.search,
    trackNewsletterSignup: engagementEvents.newsletterSignup,
    trackContact: engagementEvents.contact,
    // E-commerce events
    trackViewItem: ecommerceEvents.viewItem,
    trackAddToCart: ecommerceEvents.addToCart,
    trackBeginCheckout: ecommerceEvents.beginCheckout,
    trackPurchase: ecommerceEvents.purchase,
  };
}

/**
 * Hook to automatically track page views on route changes
 * Include this in your root layout
 */
export function usePageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const url = window.location.href;
    const title = document.title;
    pageview(pathname, title);
  }, [pathname]);
}

export default useAnalytics;
