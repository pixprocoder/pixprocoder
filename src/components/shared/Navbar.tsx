'use client';
import Link from 'next/link';

import React, { useContext, useState } from 'react';
import { navLinks } from '../../constants';
import { Button } from '../ui/button';
import { AuthContext } from '@/src/providers/AuthProviders';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { motion } from 'framer-motion';
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

// component start here
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { items } = useAppSelector((state) => state.cart);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleResponsiveMenu = () => {
    setIsOpen(!isOpen);
  };
  const dropdownItems = [
    { label: 'Dahboad', href: '/dashboard' },
    { label: 'Billing' },
    { label: 'Team' },
    { label: 'Logout' },
  ];

  const handleSignOut = () => {
    logOut()
      .then((res: any) => {})
      .catch((error: any) => {});
  };

  const handleMobileNav = (link: string) => {
    router.push(link);
    setIsOpen(false);
  };

  return (
    <div className="navbar sticky top-0 flex justify-between py-4 px-4 lg:container mx-auto z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 items-center shadow-sm border-b">
      <div className="flex-1">
        <Link href="/" className="font-bold text-xl flex gap-2 items-center">
          <Image width={30} height={30} src="/vertical-logo.png" alt="logo" />
          <p className="text-foreground">PIXPROCODER</p>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="mr-4 flex items-center md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <div className="relative">
              <IoBagAddOutline className="text-foreground text-2xl mr-4 cursor-pointer hover:text-primary transition-all" />
              <span className="absolute -top-4 -left-2 p-1 text-xs text-primary">
                {items?.length?.toString().padStart(2, '0')}
              </span>
            </div>
          </SheetTrigger>
          <SheetContent className="border-muted">
            <CartSheet />
          </SheetContent>
        </Sheet>

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
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/user">My Profile</Link>
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

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed rounded-l-3xl top-0 right-0 w-2/3 h-full bg-popover shadow-md p-4 z-50 md:hidden"
      >
        <div
          className="lg:hidden absolute right-4 text-right cursor-pointer z-30"
          onClick={handleResponsiveMenu}
        >
          {isOpen ? (
            <AiOutlineClose className="text-foreground text-2xl" />
          ) : (
            <GiHamburgerMenu className="text-foreground text-2xl" />
          )}
        </div>
        <ul className="space-y-4 pt-12 flex flex-col justify-center items-center">
          {navLinks.map((el, i) => (
            <li key={i}>
              <span
                onClick={() => handleMobileNav(el.to)}
                className="cursor-pointer hover:font-bold text-foreground hover:text-primary transition-all"
              >
                {el.key}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-6 items-center">
        {navLinks.map((el, i) => (
          <li key={i}>
            <Link
              className="font-medium text-foreground/80 hover:text-foreground transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all"
              href={el.to}
            >
              {el.key}
            </Link>
          </li>
        ))}

        <Sheet>
          <SheetTrigger asChild>
            <div className="relative">
              <IoBagAddOutline className="text-foreground text-2xl mr-4 cursor-pointer hover:text-primary transition-all" />
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
      </ul>
    </div>
  );
};

export default Navbar;
