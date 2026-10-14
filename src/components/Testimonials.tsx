'use client';

import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { testimonials } from '../constants';
import { staggerContainer, staggerItem } from './motion/Reveal';

function Avatar({ name, avatar }: { name: string; avatar?: string }) {
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
      {avatar ? (
        <img src={avatar} alt="" className="size-full object-cover" />
      ) : (
        <span className="flex size-full items-center justify-center text-xs font-medium text-muted-foreground">
          {initials}
        </span>
      )}
    </div>
  );
}

function QuoteCard({
  name,
  role,
  country,
  avatar,
  text,
  projectLink,
  featured = false,
  className,
}: {
  name: string;
  role: string;
  country: string;
  avatar: string;
  text: string;
  projectLink?: string;
  featured?: boolean;
  className?: string;
}) {
  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={cn(
        'flex h-full flex-col justify-between rounded-xl border border-border bg-card',
        featured ? 'p-6 sm:p-8' : 'p-5 sm:p-6',
        className,
      )}
    >
      <blockquote
        className={cn(
          'leading-relaxed text-foreground',
          featured ? 'text-base sm:text-lg' : 'text-sm sm:text-base',
        )}
      >
        {text}
      </blockquote>

      <footer className="mt-8 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={name} avatar={avatar} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {role}
              {country ? ` · ${country}` : ''}
            </p>
          </div>
        </div>

        {projectLink && (
          <Link
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Project
            <FiArrowUpRight className="size-3.5" />
          </Link>
        )}
      </footer>
    </motion.article>
  );
}

const Testimonials = () => {
  const [featured, ...rest] = testimonials;

  return (
    <section id="testimonials" className="border-t border-border py-16 sm:py-24">
      <div className="mb-10 space-y-3 sm:mb-14">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
          Clients
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Kind words.
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          Notes from people I&apos;ve designed and built with.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2"
      >
        <QuoteCard
          name={featured.name}
          role={featured.role}
          country={featured.country}
          avatar={featured.avatar}
          text={featured.text}
          projectLink={featured.projectLink}
          featured
          className="lg:col-span-2 lg:row-span-2"
        />
        {rest.map((testimonial) => (
          <QuoteCard
            key={testimonial.name}
            name={testimonial.name}
            role={testimonial.role}
            country={testimonial.country}
            avatar={testimonial.avatar}
            text={testimonial.text}
            projectLink={testimonial.projectLink}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
