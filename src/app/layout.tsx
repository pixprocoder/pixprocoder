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
    <html lang="en">
      <body suppressHydrationWarning={true} className="container mx-auto">
        <main>{children}</main>
      </body>
    </html>
  );
}
