'use client';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { navLinks } from '../../constants';
import { Button } from '../ui/button';
import { AuthContext } from '@/src/providers/AuthProviders';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { IoBagAddOutline } from 'react-icons/io5';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet';
import CartSheet from '@/src/components/cart/CartSheet';
import { useAppSelector } from '@/src/redux/hooks/hooks';
import { ThemeToggle } from './ThemeToggle';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FiX } from 'react-icons/fi';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { items } = useAppSelector((state) => state.cart);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    logOut()
      .then(() => router.push('/'))
      .catch((error) => console.error(error));
  };

  const handleMobileNav = (link: string) => {
    router.push(link);
    setIsOpen(false);
  };

  return (
    <div className="navbar sticky top-0 flex justify-between py-4 px-4 lg:container mx-auto z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 items-center shadow-sm border-b">
      {/* Mobile Menu */}
      <div className="flex items-center md:hidden gap-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="relative p-2">
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <FiX className="h-6 w-6 text-foreground" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <RxHamburgerMenu className="h-6 w-6 text-foreground" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </SheetTrigger>

          <SheetContent side="bottom" className="rounded-t-2xl h-[80vh]">
            <div className="flex flex-col h-full">
              <ul className="flex-1 space-y-6 pt-8">
                {navLinks.map((el, i) => (
                  <li key={i}>
                    <button
                      onClick={() => handleMobileNav(el.to)}
                      className="w-full text-center text-2xl font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {el.key}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className=" ">
        <Link href="/" className="font-bold text-xl flex gap-2 items-center">
          <Image
            className="hidden md:block"
            width={30}
            height={30}
            src="/vertical-logo.png"
            alt="logo"
          />
          <p className="text-foreground ">PIXPROCODER</p>
        </Link>
      </div>

      {/* Mobile only  */}
      <div className="flex md:hidden gap-2">
        <ThemeToggle />
        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="border border-muted">
                  {user?.photoURL ? (
                    <AvatarImage src={user?.photoURL} />
                  ) : (
                    <AvatarFallback className="bg-muted text-foreground">
                      {user?.displayName?.slice(0, 2).toUpperCase() || 'CN'}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover text-popover-foreground">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile/user">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="primary-btn">LOGIN</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-6">
        {navLinks.map((el, i) => (
          <Link
            key={i}
            href={el.to}
            className="font-medium text-foreground/80 hover:text-foreground transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all"
          >
            {el.key}
          </Link>
        ))}

        <Sheet>
          <SheetTrigger asChild>
            <div className="relative cursor-pointer">
              <IoBagAddOutline className="text-foreground text-2xl mr-4 hover:text-primary transition-all" />
              <span className="absolute -top-4 -left-2 p-1 text-xs text-primary">
                {items?.length?.toString().padStart(2, '0')}
              </span>
            </div>
          </SheetTrigger>
          <SheetContent className="border-muted">
            <CartSheet />
          </SheetContent>
        </Sheet>

        <ThemeToggle />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="border border-muted">
                {user?.photoURL ? (
                  <AvatarImage src={user?.photoURL} />
                ) : (
                  <AvatarFallback className="bg-muted text-foreground">
                    {user?.displayName?.slice(0, 2).toUpperCase() || 'CN'}
                  </AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover text-popover-foreground">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile/user">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button className="primary-btn">LOGIN</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
