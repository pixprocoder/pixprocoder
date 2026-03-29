'use client';
import { motion } from 'framer-motion';
import { FiChevronRight, FiFileText, FiHelpCircle, FiTerminal } from 'react-icons/fi';
import { faqItems } from '../constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

function FAQPage() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-background border-t border-border/50">
      <div className="container mx-auto">
        {/* Section Header - Consistent Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Selected <span className="text-primary font-mono italic">system_docs</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Technical documentation and frequently asked questions regarding PixProcoder ecosystem.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span>DOCS_VERSION_1.5.0</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Side: Docs Sidebar Aesthetic */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block lg:col-span-4 sticky top-24"
          >
            <div className="rounded-2xl border border-border bg-muted/20 p-6 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary uppercase tracking-wider">
                  <FiTerminal size={14} />
                  <span>docs_navigation</span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'getting_started.md', active: false },
                    { label: 'system_architecture.md', active: false },
                    { label: 'faq_index.md', active: true },
                    { label: 'api_reference.md', active: false },
                    { label: 'security_audit.log', active: false },
                  ].map((doc) => (
                    <div
                      key={doc.label}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-mono transition-colors ${doc.active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                    >
                      <FiFileText size={12} />
                      <span>{doc.label}</span>
                      {doc.active && <div className="ml-auto w-1 h-1 rounded-full bg-primary"></div>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
                  <FiHelpCircle size={14} />
                  <span>support_channels</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Can&apos;t find the documentation you need? Reach out via our primary communication channels.
                </p>
                <button className="w-full py-2 bg-background border border-border rounded-md text-[10px] font-mono font-bold hover:bg-accent transition-all text-center">
                  OPEN_SUPPORT_TICKET
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Redesigned Accordion */}
          <div className="lg:col-span-8 space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={item.value}
                  className="border-border/50 mb-4 bg-muted/10 rounded-xl px-2 md:px-4 overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline group text-left py-6">
                    <div className="flex items-start gap-4">
                      <span className="text-primary font-mono text-sm md:text-base font-bold mt-0.5 shrink-0">[ Q ]</span>
                      <span className="text-sm md:text-base font-bold text-foreground transition-colors group-hover:text-primary leading-snug">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="flex items-start gap-4 pl-0 md:pl-0">
                      <span className="text-muted-foreground font-mono text-sm md:text-base font-bold mt-0.5 shrink-0 opacity-50">[ A ]</span>
                      <div className="space-y-4">
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                        {item.link && (
                          <a
                            href={item.link}
                            className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:underline"
                          >
                            <span>view_reference()</span>
                            <FiChevronRight size={12} />
                          </a>
                        )}
                      </div>
                    </div>
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
