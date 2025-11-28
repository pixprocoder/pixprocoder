'use client';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import { testimonials } from '../constants';

const Testimonials = () => {
  // Duplicate testimonials array to create an infinite loop effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/5">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Client Voices
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Insights from collaborators and customers about our work together
          </p>
        </motion.div>

        {/* Auto-moving testimonial carousel */}
        <div className="relative overflow-hidden py-8">
          <div className="flex animate-scroll">
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                className="border border-border/50 rounded-xl p-6 bg-background/80 backdrop-blur-sm hover:border-primary/30 transition-all min-w-[350px] max-w-md flex-shrink-0 mx-3"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.country}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm italic">
                  "{testimonial.text}"
                </p>

                {testimonial.projectLink && (
                  <a
                    href={testimonial.projectLink}
                    className="inline-flex items-center text-xs text-primary hover:underline gap-1 mt-4"
                  >
                    View Project <FiArrowRight className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CSS for the animation */}
        <style jsx global>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            display: flex;
            animation: scroll 40s linear infinite;
            width: 200%; /* Double the width to accommodate duplicated items */
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by developers and businesses worldwide •{' '}
            <a href="#contact" className="text-primary hover:underline">
              Share your experience
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
