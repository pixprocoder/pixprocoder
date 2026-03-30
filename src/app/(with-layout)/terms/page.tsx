'use client';
import { motion } from 'framer-motion';
import { Terminal, Scale, ShieldCheck, FileWarning, Gavel, Bell } from 'lucide-react';

export default function TermsAndConditions() {
  const sections = [
    {
      title: 'Agreement to Terms',
      icon: <Gavel className="text-primary" size={20} />,
      content: 'By accessing or using pixprocoder.com, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the service.'
    },
    {
      title: 'Intellectual Property',
      icon: <Scale className="text-primary" size={20} />,
      content: 'The content, technical articles, source code snippets, and original branding on PixProcoder are the intellectual property of MD Samsul Kobir. You may not reproduce, distribute, or create derivative works without explicit authorization.'
    },
    {
      title: 'User Obligations',
      icon: <ShieldCheck className="text-primary" size={20} />,
      content: 'Users are prohibited from using the site for any unlawful purpose or to solicit others to perform or participate in any unlawful acts. Technical reverse engineering or unauthorized "scraping" of content is strictly forbidden.'
    },
    {
      title: 'Disclaimer of Warranties',
      icon: <FileWarning className="text-primary" size={20} />,
      content: 'Technical information and code snippets provided on this blog are for educational purposes. We provide the service "as is" and do not guarantee that the code will work in your specific environment without modification.'
    },
    {
      title: 'Limitation of Liability',
      icon: <Bell className="text-primary" size={20} />,
      content: 'In no event shall PixProcoder or its founder be liable for any indirect, incidental, special, or consequential damages resulting from your use of the information or products provided on this site.'
    }
  ];

  return (
    <div className="bg-background min-h-screen py-12 md:py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="space-y-4 mb-16 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
              <Terminal size={14} />
              <span>~/legal/terms_conditions.md</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Terms <span className="text-primary font-mono italic">protocol.</span>
            </h1>
            <p className="text-muted-foreground text-lg font-mono">
              Last Updated: March 30, 2026
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid gap-8">
            {sections.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl border border-white/10 bg-muted/5 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background border border-white/10 text-primary">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold font-mono tracking-tight text-white uppercase italic">
                    {section.title.replace(/ /g, '_')}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed font-mono text-sm md:text-base">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
