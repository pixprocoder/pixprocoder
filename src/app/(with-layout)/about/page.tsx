'use client';

import { Reveal, staggerContainer, staggerItem } from '@/src/components/motion/Reveal';
import { Button } from '@/src/components/ui/button';
import { contactInfo } from '@/src/constants';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const RESUME_HREF = '/Samsul_Kobir_Senior_SWE_Resume.pdf';

const journey = [
  {
    period: '2020',
    title: 'Started from scratch',
    body: 'Taught myself HTML, CSS, and JavaScript with no bootcamp and no CS degree — documentation, tutorials, and building until it worked. First real project: a personal blog with likes, comments, and views.',
    tags: ['HTML/CSS', 'JavaScript', 'React'],
  },
  {
    period: '2021 – 2022',
    title: 'First client work',
    body: 'Landed paid projects on Fiverr and Upwork. Delivered a vehicle rental API in Express and TypeScript, a driving-school booking platform in SvelteKit with a React Native companion, and a Shopify print-on-demand store for an Austrian client.',
    tags: ['Node.js', 'PostgreSQL', 'SvelteKit', 'React Native', 'Shopify'],
  },
  {
    period: '2023',
    title: 'Founded Pixprocoder Studio SRL',
    body: 'Registered a software consultancy in Bucharest — sole owner, EU entity, proper invoicing. Took on clients in Australia and the UK, brought on a design contractor, and began working at European market rates.',
    tags: ['Consultancy', 'EU company', 'B2B'],
  },
  {
    period: '2024',
    title: 'MediStore — production SaaS',
    body: 'Built MediStore, a multi-vendor medical e-commerce platform: Next.js, Node/Express, PostgreSQL with Prisma, deployed on Oracle Cloud with Nginx and SSL. Full production system with auth, payments, and vendor management.',
    tags: ['Next.js', 'PostgreSQL', 'Prisma', 'Oracle Cloud'],
  },
  {
    period: '2025',
    title: 'MomentPro — SaaS product',
    body: 'Built and launched MomentPro, an event photo-sharing product. Guests upload from any device; organisers get a private gallery. Svelte 5, Cloudflare R2, Stripe billing.',
    tags: ['SvelteKit', 'Cloudflare R2', 'Stripe', 'Drizzle'],
  },
  {
    period: '2026',
    title: 'DevOps, end to end',
    body: 'A deliberate shift toward cloud and operations — still full-stack, now owning the rest of the lifecycle. Containerising apps, provisioning with Terraform, wiring CI/CD, and watching production with Prometheus and Grafana. Studying toward AWS Cloud Practitioner and CKA.',
    tags: ['Docker', 'Terraform', 'Kubernetes', 'GitHub Actions', 'Go', 'AWS'],
  },
];

const work = [
  {
    title: 'MomentPro',
    status: 'Live',
    body: 'Event photo-sharing SaaS. Guests upload from any device; organisers get a private gallery per event.',
  },
  {
    title: 'MediStore',
    status: 'Live',
    body: 'Multi-vendor medical e-commerce with auth, vendor management, and payments. Running on Oracle Cloud.',
  },
  {
    title: 'Book Review API',
    status: 'DevOps',
    body: 'Go REST API used as a live reference for the full pipeline: Docker, Terraform, Ansible, EKS, Grafana.',
  },
  {
    title: 'Pixprocoder Studio',
    status: 'Active',
    body: 'Registered EU consultancy. Client work across Australia, the UK, and Europe.',
  },
];

const skillGroups = [
  {
    title: 'Frontend',
    items: ['React / Next.js', 'SvelteKit', 'TypeScript', 'React Native'],
  },
  {
    title: 'Backend',
    items: ['Node.js / Express', 'Go', 'Bun', 'PostgreSQL · Prisma · Drizzle'],
  },
  {
    title: 'DevOps',
    items: ['Docker', 'Terraform · Ansible', 'Kubernetes (EKS)', 'GitHub Actions'],
  },
  {
    title: 'Cloud',
    items: ['AWS', 'Oracle Cloud · Cloudflare', 'Prometheus · Grafana', 'Nginx · TLS'],
  },
];

export default function AboutPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="space-y-8">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
              About
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Sam Kobir.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Full-stack engineer turned DevOps. I build products end-to-end and
              keep them running in production. Self-taught since 2020. Originally
              Dhaka, based in Bucharest.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild className="h-11 w-full rounded-xl px-6 sm:w-auto">
                <a href={RESUME_HREF} download>
                  <Download className="mr-2 size-4" />
                  Download resume
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 w-full rounded-xl px-6 sm:w-auto"
              >
                <Link href="/contact">
                  Get in touch
                  <FiArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="max-w-xl space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              I started learning to code in 2020 with no formal computer-science
              background — curiosity and a lot of late nights. Within a year I
              was building real applications with React and Node.js. Within two
              I was delivering paid work for international clients.
            </p>
            <p>
              In 2023 I founded{' '}
              <span className="text-foreground">Pixprocoder Studio SRL</span>, a
              registered software consultancy in Bucharest. Freelance work grew
              into a company: structure, invoicing, a design partner, and
              clients in Australia, the UK, and across Europe.
            </p>
            <p>
              In 2026 I shifted toward DevOps and cloud — not dropping
              full-stack, but owning the other half. I write the application,
              containerise it, provision infrastructure, wire CI/CD, and watch
              it in production. The product background is what makes that
              faster.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="space-y-6">
          <div className="relative mx-auto aspect-[3/4] max-h-[28rem] w-full max-w-sm overflow-hidden rounded-2xl border border-border lg:mx-0 lg:max-h-none">
            <Image
              src="/profile-me.jpg"
              alt="Sam Kobir"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 24rem, 28rem"
            />
          </div>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            {[
              { label: 'Based', value: 'Bucharest' },
              { label: 'Building since', value: '2020' },
              { label: 'Studio', value: 'Pixprocoder SRL' },
              { label: 'Open to', value: 'EU contracts' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-card p-4">
                <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                  {item.label}
                </dt>
                <dd className="mt-1 font-medium text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="mt-20 border-t border-border pt-16 sm:mt-24 sm:pt-20">
        <Reveal className="mb-10 space-y-3 sm:mb-14">
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Journey
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            2020 to now.
          </h2>
        </Reveal>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-0"
        >
          {journey.map((entry) => (
            <motion.li
              key={entry.period}
              variants={staggerItem}
              className="grid gap-2 border-t border-border py-8 sm:grid-cols-[8rem_1fr] sm:gap-8"
            >
              <p className="text-sm font-medium text-primary">{entry.period}</p>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {entry.body}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>

      <div className="mt-8 border-t border-border pt-16 sm:mt-12 sm:pt-20">
        <Reveal className="mb-10 space-y-3 sm:mb-14">
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Selected work
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Things I&apos;ve shipped.
          </h2>
        </Reveal>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {work.map((item) => (
            <motion.article
              key={item.title}
              variants={staggerItem}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {item.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div className="mt-16 border-t border-border pt-16 sm:mt-20 sm:pt-20">
        <Reveal className="mb-10 space-y-3 sm:mb-14">
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Stack
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What I work with.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium text-foreground">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Reveal className="mt-16 rounded-2xl border border-border bg-card p-6 sm:mt-20 sm:p-10">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
          Available
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Full-stack or DevOps. Remote EU preferred.
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          Invoiced B2B through Pixprocoder Studio SRL.{' '}
          <a
            href={`mailto:${contactInfo.email}`}
            className="text-foreground hover:text-primary"
          >
            {contactInfo.email}
          </a>
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="h-11 rounded-xl px-6">
            <Link href="/contact">
              Start a project
              <FiArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-xl px-6">
            <a href={RESUME_HREF} download>
              <Download className="mr-2 size-4" />
              Resume
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
