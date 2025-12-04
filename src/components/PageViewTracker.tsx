'use client'; // Mark this as a client component

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
//@ts-ignore
import { analytics } from '../firebase/firebase.init';

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && analytics) {
      import('firebase/analytics').then(({ logEvent }) => {
        logEvent(analytics, 'page_view', {
          page_path: pathname,
          page_title: document.title,
        });
      });
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}
