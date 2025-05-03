// components/dashboard/DashboardNavbar.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '@/src/providers/AuthProviders';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/src/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import {
  LayoutDashboard,
  LogOut,
  User,
  Menu,
  Settings,
  Home,
} from 'lucide-react';
import { ThemeToggle } from '@/src/components/shared/ThemeToggle';

export const DashboardNavbar = ({
  onMenuToggle,
}: {
  onMenuToggle?: () => void;
}) => {
  const { user, logOut } = useContext(AuthContext);
  const router = useRouter();

  const handleSignOut = () => {
    logOut()
      .then(() => router.push('/'))
      .catch((error) => console.error(error));
  };

  return (
    <nav className="sticky top-0 flex justify-between items-center py-4 px-6 bg-background/95 backdrop-blur border-b border-border z-50">
      <div className="flex items-center gap-4 lg:hidden">
        <Button variant="ghost" size="icon" onClick={onMenuToggle}>
          <Menu className="h-6 w-6" />
        </Button>
        <Link href="/" className="font-bold">
          <Image
            width={30}
            height={30}
            src="/vertical-logo.png"
            alt="logo"
            className="h-8 w-8"
          />
        </Link>
      </div>

      <div className="hidden lg:flex flex-1">
        <Link href="/" className="font-bold text-xl flex gap-2 items-center">
          <Image
            width={30}
            height={30}
            src="/vertical-logo.png"
            alt="logo"
            className="h-8 w-8"
          />
          <span className="text-foreground">Dashboard</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        {user ? (
          <DropdownMenu>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer"
                  >
                    <Avatar className="border-2 border-transparent hover:border-primary transition-all">
                      {user?.photoURL ? (
                        <AvatarImage
                          src={user.photoURL}
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback className="bg-muted text-foreground font-medium">
                          {user?.displayName?.slice(0, 2).toUpperCase() || 'ME'}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </motion.div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-background border border-border rounded-lg shadow-xl"
                >
                  <div className="relative">
                    <div className="absolute -top-[9px] right-3 w-4 h-4 rotate-45 bg-background border-l border-t border-border" />

                    <DropdownMenuLabel className="px-4 py-2 font-normal text-sm text-muted-foreground">
                      {user?.displayName || user?.email}
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="bg-border" />

                    <DropdownMenuItem
                      asChild
                      className="px-4 py-2.5 hover:bg-muted"
                    >
                      <Link
                        href="/dashboard/profiles"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Home className="w-4 h-4 text-primary" />
                        <span>Home</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="px-4 py-2.5 hover:bg-muted"
                    >
                      <Link
                        href="/dashboard/profiles"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-primary" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      asChild
                      className="px-4 py-2.5 hover:bg-muted"
                    >
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-primary" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-border" />

                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="px-4 py-2.5 hover:bg-muted text-red-500 focus:text-red-500 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
            )}
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};
