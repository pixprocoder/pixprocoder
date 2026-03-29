'use client';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiCheckCircle, FiMessageSquare, FiGlobe } from 'react-icons/fi';
import { testimonials } from '../constants';
import Link from 'next/link';

const Testimonials = () => {
  // Double the testimonials for a seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-background overflow-hidden border-t border-border/50">
      <div className="container mx-auto mb-16">
        {/* Section Header - Consistent Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Selected <span className="text-primary font-mono italic">client_feedback</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Verified logs and peer reviews from successful collaborations across the globe.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span>TRUST_PROTOCOL_ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Scroll */}
      <div className="relative overflow-hidden py-4">
        {/* Faded Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-infinite-scroll-slow hover:[animation-play-state:paused] cursor-default">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="flex-shrink-0 w-[350px] md:w-[450px] px-4 group flex flex-col"
            >
              <div className="relative p-6 rounded-2xl border border-border bg-muted/20 hover:border-primary/30 transition-all flex flex-col h-[320px] md:h-[350px]">
                {/* Header: Verified Status */}
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-background border border-border">
                         <FiMessageSquare size={14} className="text-primary" />
                      </div>
                      <div className="text-[10px] font-mono font-bold text-foreground tracking-tight uppercase">
                         Log_{index < testimonials.length ? index + 1 : index - testimonials.length + 1}
                      </div>
                   </div>
                   <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20">
                      <FiCheckCircle size={10} className="text-green-500" />
                      <span className="text-[9px] font-mono font-bold text-green-500 uppercase tracking-tighter">Verified</span>
                   </div>
                </div>

                {/* Testimonial Text - Uniform height with line clamp */}
                <div className="flex-grow flex flex-col justify-start overflow-hidden">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic line-clamp-6 group-hover:line-clamp-none group-hover:overflow-y-auto scrollbar-hide">
                    "{testimonial.text}"
                  </p>
                  {testimonial.text.length > 200 && (
                    <span className="text-[10px] font-mono text-primary mt-2 opacity-100 group-hover:opacity-0 transition-opacity italic">
                      // scroll_to_read_more()
                    </span>
                  )}
                </div>

                {/* Footer: Client Info */}
                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border bg-background flex-shrink-0">
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground font-mono text-xs font-bold">
                          {testimonial.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-foreground truncate">
                        @{testimonial.name.toLowerCase()}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground uppercase">
                        <FiGlobe size={10} className="text-primary" />
                        <span className="truncate">{testimonial.country}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating as stars/score */}
                  <div className="flex gap-0.5 text-primary flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        size={12}
                        className={`${i < testimonial.rating ? 'fill-primary' : 'text-muted/30'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Project Link - Technical style */}
                {testimonial.projectLink && (
                  <Link
                    href={testimonial.projectLink}
                    target="_blank"
                    className="absolute bottom-2 right-6 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 text-[9px] font-mono text-primary hover:underline"
                  >
                    <span>view_project_result()</span>
                    <FiArrowRight size={10} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-infinite-scroll-slow {
          display: flex;
          width: max-content;
          animation: scroll 100s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Trust Badge / Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted/30 border border-border text-[11px] font-mono text-muted-foreground">
           <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
           <span>PIXPROCODER_TRUST_PROTOCOL: 100% SUCCESS_RATE</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
