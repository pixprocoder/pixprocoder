'use client';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/src/components/ui/sheet';
import { AuthContext } from '@/src/providers/AuthProviders';
import { useAppSelector } from '@/src/redux/hooks/hooks';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { LayoutDashboard, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import { FiTerminal, FiCpu, FiCode } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';
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
import Image from 'next/image';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
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
      {/* Dynamic Spacer: This ensures content on all pages starts below the floating navbar */}
      <div className="h-20 md:h-24 w-full" />

      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: -110 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 z-50 px-4 py-4 flex justify-center w-full"
      >
        <nav className="w-full max-w-5xl bg-[#0d1117]/80 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-full h-14 md:h-16 flex items-center justify-between px-4 md:px-6 shadow-2xl transition-all">

          {/* Left Side: Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Image src="/vertical-logo.png" alt="Logo" width={24} height={24} />
            </div>
            <span className="font-bold text-sm md:text-lg tracking-tighter text-white">
              PIXPROCODER
            </span>
          </Link>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 ${isActive
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <span className={isActive ? 'text-primary-foreground' : 'text-primary opacity-50'}>./</span>
                  {link.key.toLowerCase()}
                </Link>
              );
            })}
          </div>

          {/* Right Side: Actions & Profile */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span>SYS: OPTIMAL</span>
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                    <Avatar className="h-8 w-8 border border-white/10 group-hover:border-primary transition-colors">
                      <AvatarImage src={user.photoURL || ''} className="object-cover" />
                      <AvatarFallback className="bg-white/5 text-white text-[10px] font-mono">
                        {user?.displayName?.slice(0, 2).toUpperCase() || 'USR'}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-4 bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl font-mono text-xs text-white">
                  <DropdownMenuLabel className="px-4 py-3 font-normal text-gray-400">
                    Auth: <span className="text-white">{user?.email || 'root'}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')} className="px-4 py-2.5 cursor-pointer hover:bg-white/5 focus:bg-white/5 gap-2">
                    <LayoutDashboard size={14} className="text-primary" />
                    <span>view_dashboard()</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard/profiles')} className="px-4 py-2.5 cursor-pointer hover:bg-white/5 focus:bg-white/5 gap-2">
                    <User size={14} className="text-primary" />
                    <span>user_profile()</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={handleSignOut} className="px-4 py-2.5 cursor-pointer hover:bg-white/5 focus:bg-white/5 gap-2 text-red-400 focus:text-red-400">
                    <LogOut size={14} />
                    <span>sys_logout()</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button size="sm" className="h-8 md:h-9 px-3 md:px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-mono text-[9px] md:text-[10px] font-bold gap-2 uppercase tracking-wider">
                  EXEC_LOGIN <FiCode size={14} />
                </Button>
              </Link>
            )}

            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-white hover:bg-white/5">
                    <RxHamburgerMenu size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[350px] border-l border-white/10 bg-[#0d1117] text-white p-0">
                  <div className="h-full flex flex-col p-8 space-y-10">
                    <div className="flex items-center justify-between border-b border-white/10 pb-6">
                      <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                        [ SYSTEM_NAVIGATION ]
                      </span>
                      <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/5">
                        <FiCode size={20} />
                      </Button>
                    </div>

                    <nav className="flex flex-col space-y-4">
                      {navLinks.map((link) => (
                        <button
                          key={link.to}
                          onClick={() => handleMobileNav(link.to)}
                          className={`flex items-center gap-4 text-left p-4 rounded-2xl border transition-all ${pathname === link.to
                            ? 'bg-primary/10 border-primary/30 text-primary'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                            }`}
                        >
                          <FiCode className={pathname === link.to ? 'text-primary' : 'text-gray-400'} />
                          <span className="font-mono text-sm font-bold lowercase">./{link.key.toLowerCase()}</span>
                        </button>
                      ))}
                    </nav>

                    <div className="mt-auto space-y-6">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                          <FiCpu className="text-primary" />
                          <span>v15.0.0-PROD</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                          <span>SYSTEM: OPERATIONAL</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
