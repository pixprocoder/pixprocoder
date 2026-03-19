'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

/**
 * AdSense Ad Component
 * Displays Google AdSense ads in your content
 * 
 * @example
 * ```tsx
 * <AdSense slot="1234567890" format="auto" />
 * ```
 */
interface AdSenseProps {
  slot: string; // Ad slot ID from AdSense dashboard
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  layout?: 'in-article' | 'in-feed' | 'fixed';
  className?: string;
}

export default function AdSense({
  slot,
  format = 'auto',
  layout,
  className = '',
}: AdSenseProps) {
  useEffect(() => {
    try {
      // Push ad configuration to AdSense
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`my-6 flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={format === 'auto' ? 'true' : undefined}
        data-ad-layout={layout}
      />
    </div>
  );
}
