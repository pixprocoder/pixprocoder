'use client';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/src/components/ui/sheet';
import { AuthContext } from '@/src/providers/AuthProviders';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Bookmark, LogOut, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { navLinks } from '../../constants';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleSignOut = () => {
    logOut()
      .then(() => router.push('/'))
      .catch((error: any) => console.error(error));
  };

  const handleMobileNav = (link: string) => {
    router.push(link);
    setIsOpen(false);
  };

  return (
    <>
      <div className="h-20 md:h-24 w-full" />

      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: -110 },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-0 z-50 flex w-full justify-center px-4 py-4"
      >
        <nav className="flex h-14 w-full max-w-5xl items-center justify-between rounded-2xl border border-border bg-background/80 px-3 shadow-lg backdrop-blur-xl md:h-16 md:px-5">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/vertical-logo.png"
              alt="pixprocoder"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="text-sm font-semibold tracking-tight text-foreground md:text-base">
              pixprocoder
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  className={`rounded-xl px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {link.key}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage
                        src={user.photoURL || ''}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-muted text-xs text-muted-foreground">
                        {user?.displayName?.slice(0, 2).toUpperCase() || 'SK'}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="mt-3 w-56 rounded-xl border-border bg-popover text-popover-foreground"
                >
                  <DropdownMenuLabel className="font-normal">
                    <p className="text-sm font-medium text-foreground">
                      {user?.displayName || 'Account'}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer gap-2">
                    <Link href="/saved">
                      <Bookmark size={14} />
                      Saved
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                  >
                    <LogOut size={14} />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="h-9 rounded-xl px-4 text-sm">
                <Link href="/login">Sign in</Link>
              </Button>
            )}

            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl text-foreground"
                    aria-label="Open menu"
                  >
                    <Menu size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full border-border bg-background p-6 sm:max-w-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      Menu
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="h-9 w-9 rounded-xl"
                      aria-label="Close menu"
                    >
                      <X size={18} />
                    </Button>
                  </div>
                  <nav className="mt-8 flex flex-col gap-1">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.to;
                      return (
                        <button
                          key={link.to}
                          type="button"
                          onClick={() => handleMobileNav(link.to)}
                          className={`rounded-xl px-4 py-3 text-left text-base font-medium transition-colors ${
                            isActive
                              ? 'bg-accent text-accent-foreground'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                        >
                          {link.key}
                        </button>
                      );
                    })}
                    {user && (
                      <button
                        type="button"
                        onClick={() => handleMobileNav('/saved')}
                        className={`rounded-xl px-4 py-3 text-left text-base font-medium transition-colors ${
                          pathname === '/saved'
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        Saved
                      </button>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </motion.header>
    </>
  );
};

export default Navbar;
