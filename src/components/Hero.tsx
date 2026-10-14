'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { Button } from './ui/button';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-6 pb-16 sm:pt-10 sm:pb-24 lg:pt-16 lg:pb-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute top-[-20%] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] sm:h-[36rem] sm:w-[36rem]"
          animate={{ opacity: [0.45, 0.8, 0.45], scale: [1, 1.06, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div
          className="max-w-xl space-y-6 text-left sm:space-y-8"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={item}
            className="text-xs font-medium tracking-[0.18em] text-primary uppercase sm:text-sm"
          >
            Software engineer
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]"
          >
            Building products that feel considered.
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I&apos;m Sam Kobir. I design and ship web systems with Next.js,
            TypeScript, and a bias for clarity.
          </motion.p>

          <motion.div
            variants={item}
            className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row sm:items-center"
          >
            <Button
              asChild
              className="h-11 w-full rounded-xl px-6 text-sm font-medium sm:w-auto"
            >
              <Link href="/blog">
                Read writing
                <FiArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 w-full rounded-xl border-border px-6 text-sm font-medium sm:w-auto"
            >
              <Link href="#portfolio">Selected work</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px]"
        >
          <motion.div
            className="hero-portrait relative aspect-[3/4]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/profile-me.jpg"
              alt="Sam Kobir"
              fill
              priority
              className="object-cover object-[center_18%]"
              sizes="(max-width: 640px) 280px, 360px"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
