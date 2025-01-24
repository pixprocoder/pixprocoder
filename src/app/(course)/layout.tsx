import Footer from "@/src/components/shared/Footer";
import Navbar from "@/src/components/shared/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="max-w-[1200px] mx-auto">{children}</main>
      <Footer />
    </>
  );
}
