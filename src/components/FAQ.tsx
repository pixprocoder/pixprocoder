'use client';
import { useState } from 'react';
import { faqItems } from '../constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { motion } from 'framer-motion';

function FAQPage() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/5">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Common Questions
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Answers to frequent inquiries about services, orders, and
            collaborations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="hidden lg:block relative h-full"
          >
            <div className="sticky top-24">
              <div className="relative aspect-square w-full">
                <img
                  src="/faq.svg" // Consider a modern SVG illustration
                  alt="Question marks illustration"
                  className="object-contain"
                />
              </div>
              {/* <p className="text-center mt-6 text-muted-foreground">
                Can't find your answer?{' '}
                <a href="#contact" className="text-primary hover:underline">
                  Contact me directly
                </a>
              </p> */}
            </div>
          </motion.div>

          <div className="space-y-4">
            <Accordion type="single" collapsible>
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={item.value}
                  className="border-border/50"
                >
                  <motion.div whileHover={{ x: 5 }}>
                    <AccordionTrigger className="text-left hover:no-underline px-4 py-6 rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="font-medium text-foreground">
                        {item.question}
                      </span>
                    </AccordionTrigger>
                  </motion.div>
                  <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                    {item.answer}
                    {item.link && (
                      <a
                        href={item.link}
                        className="mt-3 inline-flex items-center text-primary hover:underline gap-2"
                      >
                        Learn More <FiArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQPage;
