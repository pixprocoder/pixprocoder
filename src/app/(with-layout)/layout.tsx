import Footer from "@/src/components/shared/Footer";
import Navbar from "@/src/components/shared/Navbar";
import AlertBanner from "@/src/components/shared/AlertBanner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <AlertBanner/>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
