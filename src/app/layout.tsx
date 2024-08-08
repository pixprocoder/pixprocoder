import type { Metadata } from "next";
import "./globals.css";
import AuthProviders from "../providers/AuthProviders";
import { Toaster } from "../components/ui/toaster";

export const metadata: Metadata = {
  title: "Pixprocoder",
  description: "My personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="">
        <AuthProviders>
          <main>{children}</main>
          <Toaster />
        </AuthProviders>
      </body>
    </html>
  );
}

/**
 * now we are going to code the entire website so stick with me now it's working that is fine
 * 
*/
