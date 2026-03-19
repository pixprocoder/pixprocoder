'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

/**
 * AdSense Auto Ads Component
 * Google automatically places ads throughout your site
 * 
 * Place this once in your root layout for site-wide auto ads
 */
export default function AdSenseAutoAds() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({
        enable_page_level_ads: true,
      });
    } catch (error) {
      console.error('AdSense Auto Ads error:', error);
    }
  }, []);

  return null;
}
