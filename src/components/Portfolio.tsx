'use client';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { projects } from '../constants';
import Image from 'next/image';
import Link from 'next/link';

const Portfolio = () => {
  // Use 6 projects and double them for a seamless loop
  const featuredProjects = [...projects.slice(0, 6), ...projects.slice(0, 6)];
  
  return (
    <section id="portfolio" className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Selected <span className="text-primary font-mono italic">portfolio_work</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg text-balance">
              A curated stream of engineering solutions and digital products.
            </p>
          </div>
          <Link 
            href="https://github.com/pixprocoder" 
            target="_blank"
            className="group inline-flex items-center gap-2 text-sm font-mono font-medium hover:text-primary transition-colors"
          >
            <span>./view-all-github.sh</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Infinite Horizontal Scroll using CSS Animation for perfect hover-pause */}
      <div className="relative overflow-hidden py-4">
        {/* Faded Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] cursor-pointer">
          {featuredProjects.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="flex-shrink-0 w-[320px] md:w-[500px] px-4 group/card flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted/30 border border-border/50 shadow-sm transition-all group-hover/card:border-primary/30 group-hover/card:shadow-xl group-hover/card:shadow-primary/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover/card:scale-105"
                  sizes="(max-width: 768px) 320px, 500px"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4">
                  <div className="flex gap-3">
                    <Link 
                      href={project.liveLink} 
                      target="_blank"
                      className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-xs font-mono font-bold hover:bg-primary/90 transition-all hover:scale-105"
                    >
                      <FiExternalLink size={14} /> LIVE_DEMO
                    </Link>
                    <Link 
                      href={project.gitHubLink} 
                      target="_blank"
                      className="flex items-center gap-2 px-6 py-2.5 bg-background border border-border rounded-full text-xs font-mono font-bold hover:bg-accent transition-all hover:scale-105"
                    >
                      <FiGithub size={14} /> SOURCE
                    </Link>
                  </div>
                </div>
              </div>

              {/* Info Below Image */}
              <div className="mt-6 px-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-foreground group-hover/card:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-[10px] font-mono text-muted-foreground/40 italic">
                    {project.category.toLowerCase().replace(' ', '_')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.slice(0, 3).map((tag: any) => (
                    <span key={tag.name} className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: scroll 120s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
