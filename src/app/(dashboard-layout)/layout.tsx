import Footer from "@/src/components/shared/Footer";
import Navbar from "@/src/components/shared/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1200px] mx-auto">
      <p className="text-center border-b-2 text-xl py-2">
        {" "}
        Welcome to Your Dashboard
      </p>
      {children}
    </div>
  );
}
