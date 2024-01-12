import type { Metadata } from "next";
import "./globals.css";
import AuthProviders from "../providers/AuthProviders";

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
        </AuthProviders>
      </body>
    </html>
  );
}
