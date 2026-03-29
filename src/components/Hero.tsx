'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiTerminal, FiCode, FiCpu } from 'react-icons/fi';
import { Button } from './ui/button';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Programmer Grid Background */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Left Content */}
        <motion.div
          className="space-y-6 md:space-y-8 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/50 border border-border text-xs md:text-sm font-mono text-muted-foreground">
              <FiTerminal className="text-primary" />
              <span>~/pixprocoder/init.sh</span>
              <span className="w-1.5 h-3.5 bg-primary animate-pulse ml-0.5"></span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              Engineering <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-purple-600">
                The Future.
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed border-l-2 border-primary/50 pl-4 font-mono">
              Software engineer, creator, and provider of premium tools for modern developers.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
            <Link href="/blog" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto gap-2 h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-mono text-sm">
                <FiCode />
                Read Insights
              </Button>
            </Link>

            <Link href="/shop" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto gap-2 h-11 px-6 border-border hover:bg-accent rounded-md font-mono text-sm">
                <FiCpu />
                Explore Tools
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs md:text-sm text-muted-foreground font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Systems Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <FiArrowRight className="text-primary" />
              <span>v15.0.0</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Code Window */}
        <motion.div
          initial={{ opacity: 0, y: 20, lg: { x: 20, y: 0 } } as any}
          animate={{ opacity: 1, y: 0, lg: { x: 0 } } as any}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group mt-4 lg:mt-0"
        >
          {/* Glowing backdrop */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative rounded-xl bg-[#0d1117] border border-border shadow-2xl overflow-hidden">
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-[#30363d]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="text-[10px] md:text-xs text-muted-foreground font-mono">pixprocoder.config.ts</div>
              <div className="w-12"></div>
            </div>

            {/* Code Area */}
            <div className="p-4 md:p-6 overflow-x-auto text-[13px] md:text-sm lg:text-base font-mono leading-relaxed">
              <pre className="scrollbar-hide">
                <code>
                  <span className="text-pink-400">const</span> <span className="text-blue-400">pixprocoder</span> <span className="text-pink-400">=</span> {'{\n'}
                  {'  '}status: <span className="text-green-400">"Online"</span>,{'\n'}
                  {'  '}mission: <span className="text-green-400">"Building tools."</span>,{'\n'}
                  {'  '}skills: [{'\n'}
                  {'    '}<span className="text-green-400">"React"</span>, <span className="text-green-400">"Node.js"</span>,{'\n'}
                  {'    '}<span className="text-green-400">"Architecture"</span>{'\n'}
                  {'  '}],{'\n'}
                  {'  '}execute: <span className="text-yellow-300">()</span> <span className="text-pink-400">{'=>'}</span> {'{\n'}
                  {'    '}<span className="text-pink-400">return</span> <span className="text-green-400">"Innovate."</span>;{'\n'}
                  {'  '}{'}\n'}
                  {'}'};
                </code>
              </pre>
            </div>
          </div>

          {/* Floating Element - Adjusted for better mobile handling */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 -bottom-4 md:-right-6 md:-bottom-6 bg-background border border-border rounded-lg p-3 md:p-4 shadow-xl font-mono text-[10px] md:text-xs hidden sm:block"
          >
            <div className="text-primary mb-1">~ % ./deploy.sh</div>
            <div className="text-muted-foreground">Deploying...</div>
            <div className="text-green-500 mt-1">✓ Success!</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
