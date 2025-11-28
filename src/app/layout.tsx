import OtherProviders from '@/src/providers/OtherProviders';
import 'highlight.js/styles/github-dark.css';
import type { Metadata } from 'next';
import React from 'react';
import PageViewTracker from '../components/PageViewTracker';
import { Toaster } from '../components/ui/toaster';
import AuthProviders from '../providers/AuthProviders';
import ReduxProvider from '../providers/ReduxProvider';
import TanStackQueryProvider from '../providers/TanStackQueryProvider';
import { ThemeProvider } from '../providers/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pixprocoder',
  description: 'pixprocoder is the brand name',
  // other: {
  //   'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_ID,
  // }, // Add this line for AdSense
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="">
        <ThemeProvider>
          <ReduxProvider>
            <TanStackQueryProvider>
              <AuthProviders>
                <OtherProviders>
                  <main>{children}</main>
                  <PageViewTracker />
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
