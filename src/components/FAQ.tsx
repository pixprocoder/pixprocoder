'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { faqItems } from '../constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

function FAQPage() {
  return (
    <section id="faq" className="border-t border-border py-16 sm:py-24">
      <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            FAQ
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Questions, answered.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            How I work, what I build with, and what to expect.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Get in touch
          <FiArrowRight className="size-4" />
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="border-border"
            >
              <AccordionTrigger className="py-5 text-left text-sm font-medium text-foreground hover:no-underline hover:text-primary sm:py-6 sm:text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="max-w-2xl pb-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.answer}
                </p>
                {item.link && (
                  <Link
                    href={item.link}
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                  >
                    Read more
                    <FiArrowRight className="size-3.5" />
                  </Link>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}

export default FAQPage;
