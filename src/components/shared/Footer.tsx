'use client';

import { BUY_ME_A_COFFEE_URL, contactInfo, navLinks } from '@/src/constants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Coffee } from 'lucide-react';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { Button } from '../ui/button';

const TIME_ZONE = 'Europe/Bucharest';
const BRAND = 'pixprocoder';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/pixprocoder',
    icon: FiGithub,
  },
  {
    label: 'X',
    href: 'https://x.com/pixprocoder',
    icon: FaXTwitter,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/pixprocoder',
    icon: FiLinkedin,
  },
  {
    label: 'Email',
    href: `mailto:${contactInfo.email}`,
    icon: FiMail,
  },
  {
    label: 'Buy me a coffee',
    href: BUY_ME_A_COFFEE_URL,
    icon: Coffee,
  },
];

function useLocalClock(timeZone: string) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return { time: '--:--:--', hour: null as number | null };
  }

  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);

  const hour = Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: 'numeric',
      hour12: false,
    }).format(now),
  );

  return { time, hour };
}

const Footer = () => {
  const year = new Date().getFullYear();
  const { time, hour } = useLocalClock(TIME_ZONE);
  const around = hour !== null && hour >= 9 && hour < 18;

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]"
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:py-24">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
              Contact
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Let&apos;s build something.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              An idea, a product, or a problem that needs a clear interface.
            </p>
          </div>
          <Button asChild className="h-11 w-full rounded-xl px-6 sm:w-auto">
            <Link href="/contact">
              Start a project
              <FiArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex size-2">
              {around && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              )}
              <span
                className={`relative inline-flex size-2 rounded-full ${
                  around ? 'bg-emerald-400' : 'bg-muted-foreground/50'
                }`}
              />
            </span>
            {around ? 'Around' : 'Away'}
          </span>
          <span className="text-border">·</span>
          <span>Bucharest</span>
          <span className="tabular-nums text-foreground">{time}</span>
          <span className="text-border">·</span>
          <span>
            {around
              ? 'Usually replies today'
              : 'Replies next morning'}
          </span>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div className="col-span-2 space-y-3 sm:col-span-1">
            <p className="text-sm font-medium text-foreground">pixprocoder</p>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Sam Kobir. Design and engineering for products that feel
              considered.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Explore
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Connect
            </p>
            <ul className="space-y-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      social.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <social.icon className="size-4" />
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 overflow-hidden">
          <p className="flex justify-center text-[clamp(2.75rem,11vw,7.5rem)] font-semibold leading-none tracking-tighter">
            {BRAND.split('').map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                whileHover={{ y: -8, color: 'var(--primary)' }}
                transition={{ duration: 0.2 }}
                className="inline-block cursor-default text-foreground/10"
              >
                {char}
              </motion.span>
            ))}
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} Sam Kobir</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
