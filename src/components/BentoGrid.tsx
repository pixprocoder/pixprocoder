'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiBookOpen, FiCode, FiCpu, FiStar, FiUsers } from 'react-icons/fi';

const BentoGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]"
        >
          {/* Tile 1: Featured Blog Post (Large) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl border border-border bg-muted/30 p-8 flex flex-col justify-end transition-all hover:border-primary/50"
          >
            <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <FiBookOpen size={24} />
            </div>
            <div className="space-y-4 relative z-10">
              <span className="text-xs font-mono text-primary uppercase tracking-wider">Latest Insight</span>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                Mastering Next.js 15: <br /> The Ultimate Guide to Server Components.
              </h3>
              <p className="text-muted-foreground text-sm md:text-base max-w-sm">
                Deep dive into the latest features of Next.js and how to optimize your applications for 2026.
              </p>
              <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-medium group/link">
                Read Article <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* Decorative background element */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
          </motion.div>

          {/* Tile 2: Selected Work (Medium) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 md:row-span-1 group relative overflow-hidden rounded-3xl border border-border bg-accent/20 p-8 flex flex-col justify-center transition-all hover:border-blue-500/50"
          >
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono text-blue-500 uppercase tracking-wider">Showcase</span>
                  <h3 className="text-xl md:text-2xl font-bold">Selected Works</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Explore a curated collection of digital products and engineering solutions.
                  </p>
                </div>
                <div className="flex-shrink-0">
                   <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:rotate-6 transition-transform">
                      <FiCode size={40} />
                   </div>
                </div>
             </div>
             <Link href="#portfolio" className="mt-6 inline-flex items-center gap-2 text-blue-500 font-medium group/link">
                View Portfolio <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
          </motion.div>

          {/* Tile 3: Stats (Small) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-3xl border border-border bg-background p-6 flex flex-col justify-between transition-all hover:border-green-500/50"
          >
            <div className="flex items-center justify-between">
               <FiUsers className="text-green-500" size={20} />
               <span className="text-[10px] font-mono text-muted-foreground uppercase">Social Proof</span>
            </div>
            <div>
               <div className="text-3xl font-bold">200+</div>
               <p className="text-xs text-muted-foreground mt-1 text-balance">Developers helped through my courses and tools.</p>
            </div>
          </motion.div>

          {/* Tile 4: Tech Stack/Small Snippet (Small) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-3xl border border-border bg-background p-6 flex flex-col justify-between transition-all hover:border-purple-500/50"
          >
            <div className="flex items-center justify-between">
               <FiCode className="text-purple-500" size={20} />
               <span className="text-[10px] font-mono text-muted-foreground uppercase">Stack</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-4">
               {['Next.js', 'React', 'TS', 'Node', 'AWS'].map(tech => (
                 <span key={tech} className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-mono">
                   {tech}
                 </span>
               ))}
            </div>
            <div className="text-[10px] text-muted-foreground mt-2 font-mono">
              // Always evolving
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default BentoGrid;
