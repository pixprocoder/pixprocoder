'use client';
import Script from 'next/script';
import { useEffect } from 'react';

export default function GoogleAdsense() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4097711579904962"
      />

      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4097711579904962"
        data-ad-slot="6491139771"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
}
