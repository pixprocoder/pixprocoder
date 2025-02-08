import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import AuthProviders from '../providers/AuthProviders';
import { Toaster } from '../components/ui/toaster';
import OtherProviders from '@/src/providers/OtherProviders';
import TanStackQueryProvider from '../providers/TanStackQueryProvider';
import ReduxProvider from '../providers/ReduxProvider';

export const metadata: Metadata = {
  title: 'Pixprocoder',
  description: 'My personal website',
  other: {
    'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_ID,
  }, // Add this line for AdSense
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="">
        <ReduxProvider>
          <TanStackQueryProvider>
            <AuthProviders>
              <OtherProviders>
                <main>{children}</main>
                <Toaster />
                {/*   <CartIcon /> */}
              </OtherProviders>
            </AuthProviders>
          </TanStackQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

/**
 * now we are going the entire website so stick with me now it's working that is fine
 *
 */
