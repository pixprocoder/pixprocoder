// components/dashboard/Sidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CgProfile } from 'react-icons/cg';
import {
  FiBox,
  FiDollarSign,
  FiFileText,
  FiHome,
  FiSettings,
  FiShoppingBag,
  FiUser,
} from 'react-icons/fi';

import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';

export const Sidebar = ({
  mobile,
  className,
  onLinkClick,
}: {
  mobile?: boolean;
  className?: string;
  onLinkClick?: () => void;
}) => {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Overview', icon: <FiUser /> },
    { href: '/dashboard/profiles', label: 'My Profile', icon: <CgProfile /> },
    { href: '/dashboard/orders', label: 'Orders', icon: <FiShoppingBag /> },
    { href: '/dashboard/products', label: 'Products', icon: <FiBox /> },
    { href: '/dashboard/blogs', label: 'Blogs', icon: <FiFileText /> },
    { href: '/dashboard/sales', label: 'Sales', icon: <FiDollarSign /> },
    { href: '/dashboard/settings', label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <aside
      className={cn(
        'flex flex-col h-full border-r border-border bg-background/95 backdrop-blur-sm',
        mobile ? 'w-[250px]' : 'fixed w-[250px]',
        className,
      )}
    >
      <div className="p-6 pb-2">
        <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
          <Link
            href="/"
            onClick={onLinkClick}
            className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent flex items-center gap-2"
          >
            <FiHome className="inline-block" />
            Back to Site
          </Link>
        </motion.div>
      </div>

      <nav className="flex-1 p-4">
        {links.map((link) => (
          <Button
            key={link.href}
            asChild
            variant="ghost"
            className={cn(
              'w-full justify-start gap-3 mb-1',
              pathname === link.href && 'bg-muted',
            )}
          >
            <Link href={link.href} onClick={onLinkClick}>
              {link.icon}
              {link.label}
            </Link>
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Logged in as: user@example.com
        </div>
      </div>
    </aside>
  );
};
