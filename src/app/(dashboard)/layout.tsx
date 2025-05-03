// app/(dashboard)/layout.tsx
'use client';
import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/src/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/src/lib/utils';
import { Sidebar } from './dashboard/Sidebar';
import { DashboardNavbar } from './dashboard/DashboardNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // Close sidebar on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setSidebarOpen(false);
    };

    router?.events?.on('routeChangeStart', handleRouteChange);
    return () => {
      router?.events?.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:block" />

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger className="lg:hidden">
          <div className="sr-only">Open menu</div>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px] p-0">
          <SheetTitle className="sr-only">menu</SheetTitle>
          <Sidebar mobile onLinkClick={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardNavbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main
          className={cn(
            'flex-1 flex flex-col gap-4 p-4 lg:gap-6 lg:p-6',
            'lg:ml-[250px] mt-16 lg:mt-0',
          )}
        >
          <div className="w-full max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
