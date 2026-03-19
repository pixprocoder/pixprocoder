import OtherProviders from '@/src/providers/OtherProviders';
import 'highlight.js/styles/github-dark.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import React from 'react';
import PageViewTracker from '../components/PageViewTracker';
import { Toaster } from '../components/ui/toaster';
import AdSenseAutoAds from '../components/AdSenseAutoAds';
import AuthProviders from '../providers/AuthProviders';
import ReduxProvider from '../providers/ReduxProvider';
import TanStackQueryProvider from '../providers/TanStackQueryProvider';
import { ThemeProvider } from '../providers/ThemeProvider';
import './globals.css';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'ca-pub-4097711579904962';

export const metadata: Metadata = {
  title: 'pixprocoder',
  description:
    'pixprocoder is the website of Md Samsul Kobir. he is a software engineer running his own business. this website has blogs and the author is implemening new features often.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Google Analytics Script */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      {/* Google AdSense Script */}
      {ADSENSE_PUBLISHER_ID && (
        <Script
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
          crossOrigin="anonymous"
        />
      )}
      <body suppressHydrationWarning={true} className="">
        <ThemeProvider>
          <ReduxProvider>
            <TanStackQueryProvider>
              <AuthProviders>
                <OtherProviders>
                  <main>{children}</main>
                  <PageViewTracker />
                  <AdSenseAutoAds />
                  <Toaster />
                  {/*   <CartIcon /> */}
                </OtherProviders>
              </AuthProviders>
            </TanStackQueryProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
