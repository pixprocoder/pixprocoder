import Footer from "@/src/components/shared/Footer";
import Navbar from "@/src/components/shared/Navbar";
import Sidebar from "./_components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1200px] mx-auto dashboard-container  gap-5">
      <Sidebar />
      {children}
    </div>
  );
}
