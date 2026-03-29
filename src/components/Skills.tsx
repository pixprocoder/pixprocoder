'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { technologies } from '../constants';
import { FiCpu, FiLayout, FiDatabase, FiTool, FiArrowRight } from 'react-icons/fi';

const Skills = () => {
  // Define categories with titles and associated tech names
  const modules = [
    {
      id: 'frontend',
      title: 'ENGINE_FRONTEND',
      icon: <FiLayout className="text-primary" />,
      techs: ['React JS', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux Toolkit', 'HTML 5', 'CSS 3'],
      status: 'OPTIMAL',
    },
    {
      id: 'backend',
      title: 'CORE_BACKEND',
      icon: <FiCpu className="text-blue-500" />,
      techs: ['Node JS', 'Express JS', 'Next.js'], // Adding some common ones if not in list
      status: 'STABLE',
    },
    {
      id: 'data',
      title: 'DATA_LAYERS',
      icon: <FiDatabase className="text-green-500" />,
      techs: ['MongoDB', 'PostgreSQL', 'Firebase'], // Mapping existing and common
      status: 'ACTIVE',
    },
    {
      id: 'devops',
      title: 'DEV_OPS_TOOLS',
      icon: <FiTool className="text-purple-500" />,
      techs: ['git', 'docker', 'figma', 'AWS'],
      status: 'READY',
    }
  ];

  // Helper to find tech icon from technologies constant
  const getTechIcon = (name: string) => {
    const tech = technologies.find(t => t.name.toLowerCase() === name.toLowerCase());
    return tech ? tech.icon : null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="skills" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Selected <span className="text-primary font-mono italic">tech_stack</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              A comprehensive breakdown of the technologies powering PixProcoder solutions.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span>SYSTEM_READY_V15</span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {modules.map((module) => (
            <motion.div
              key={module.id}
              variants={itemVariants}
              className="relative p-6 rounded-2xl border border-border bg-muted/20 hover:border-primary/30 transition-all group overflow-hidden"
            >
              {/* Module Header */}
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-background border border-border group-hover:border-primary/50 transition-colors">
                       {module.icon}
                    </div>
                    <div>
                       <h3 className="font-mono text-sm font-bold tracking-wider text-foreground">
                          {module.title}
                       </h3>
                       <div className="text-[10px] font-mono text-muted-foreground">
                          [ status: <span className="text-green-500 font-bold">{module.status}</span> ]
                       </div>
                    </div>
                 </div>
                 <div className="text-[10px] font-mono text-muted-foreground/30">
                    ID: {module.id.toUpperCase()}_0{modules.indexOf(module) + 1}
                 </div>
              </div>

              {/* Tech Chips Grid */}
              <div className="flex flex-wrap gap-3 relative z-10">
                 {module.techs.map((techName) => {
                    const icon = getTechIcon(techName);
                    return (
                      <div 
                        key={techName}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border hover:border-primary/40 transition-all hover:translate-y-[-2px] group/chip"
                      >
                         {icon && (
                           <div className="relative w-4 h-4">
                             <Image src={icon} alt={techName} fill className="object-contain" />
                           </div>
                         )}
                         <span className="text-xs font-mono text-muted-foreground group-hover/chip:text-foreground transition-colors">
                            {techName}
                         </span>
                      </div>
                    );
                 })}
              </div>

              {/* Decorative Background Element */}
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                 {module.icon}
                 <div className="text-8xl font-bold font-mono">
                    {modules.indexOf(module) + 1}
                 </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Technical Detail */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 pt-8 border-t border-border/50 text-xs font-mono text-muted-foreground"
        >
           <div className="flex items-center gap-2">
              <FiArrowRight className="text-primary" />
              <span>Full-Stack Versatility</span>
           </div>
           <div className="flex items-center gap-2">
              <FiArrowRight className="text-primary" />
              <span>Modern Standards Compliance</span>
           </div>
           <div className="flex items-center gap-2">
              <FiArrowRight className="text-primary" />
              <span>Continuous Integration Driven</span>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
