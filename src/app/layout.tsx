import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";

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
    <ClerkProvider>
      <html lang="en">
        <body suppressHydrationWarning={true} className="">
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
