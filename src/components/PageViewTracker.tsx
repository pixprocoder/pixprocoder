'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { getAnalyticsInstance } from '../firebase/firebase.init';
import { pageview as ga4Pageview } from '../lib/analytics';

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const url = window.location.href;
    const title = document.title;

    // Track with GA4 (primary)
    ga4Pageview(pathname, title);

    // Track with Firebase Analytics (if available)
    const analytics = getAnalyticsInstance();
    if (analytics) {
      import('firebase/analytics').then(({ logEvent }) => {
        logEvent(analytics, 'page_view', {
          page_path: pathname,
          page_title: title,
        });
      });
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}
