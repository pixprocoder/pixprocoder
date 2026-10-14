import Footer from '@/src/components/shared/Footer';
import Navbar from '@/src/components/shared/Navbar';
import SiteWidth from '@/src/components/shared/SiteWidth';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <SiteWidth>{children}</SiteWidth>
      <Footer />
    </>
  );
}
