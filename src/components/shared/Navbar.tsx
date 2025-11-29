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
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/src/components/ui/sheet';
import CartSheet from '@/src/components/cart/CartSheet';
import { useAppSelector } from '@/src/redux/hooks/hooks';
import { ThemeToggle } from './ThemeToggle';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FiX } from 'react-icons/fi';
import { LayoutDashboard, LogOut, User } from 'lucide-react';

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
            <SheetTitle className="sr-only">menu</SheetTitle>
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
                        {user?.displayName?.slice(0, 2).toUpperCase() || 'CN'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </motion.div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-48 bg-background border border-border rounded-lg shadow-xl mt-2"
              >
                <div className="relative">
                  {/* Dropdown arrow */}
                  <div className="absolute -top-[9px] right-3 w-4 h-4 rotate-45 bg-background border-l border-t border-border" />

                  <DropdownMenuLabel className="px-4 py-2 font-normal text-sm text-muted-foreground">
                    {user?.displayName || user?.email || 'Welcome!'}
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
                      <User className="w-4 h-4 text-primary" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="px-4 py-2.5 hover:bg-muted"
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-primary" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-border" />

                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="px-4 py-2.5 hover:bg-muted text-red-500 focus:text-red-500"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </div>
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

        {/* <Sheet>
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
        </Sheet> */}

        <ThemeToggle />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Avatar className="border-2 border-transparent hover:border-primary transition-all">
                  {user?.photoURL ? (
                    <AvatarImage src={user.photoURL} className="object-cover" />
                  ) : (
                    <AvatarFallback className="bg-muted text-foreground font-medium">
                      {user?.displayName?.slice(0, 2).toUpperCase() || 'CN'}
                    </AvatarFallback>
                  )}
                </Avatar>
              </motion.div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48 bg-background border border-border rounded-lg shadow-xl mt-2"
            >
              <div className="relative">
                {/* Dropdown arrow */}
                <div className="absolute -top-[9px] right-3 w-4 h-4 rotate-45 bg-background border-l border-t border-border" />

                <DropdownMenuLabel className="px-4 py-2 font-normal text-sm text-muted-foreground">
                  {user?.displayName || user?.email || 'Welcome!'}
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
                    <User className="w-4 h-4 text-primary" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="px-4 py-2.5 hover:bg-muted"
                >
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 text-primary" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-border" />

                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="px-4 py-2.5 cursor-pointer hover:bg-muted text-red-500 focus:text-red-500"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </div>
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
