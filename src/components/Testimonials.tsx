'use client';
import { testimonials } from '../constants';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';

const Testimonials = () => {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-border/50 rounded-xl p-6 bg-background/80 backdrop-blur-sm hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
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
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4 text-primary">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? 'fill-current' : ''}`}
                  />
                ))}
              </div>

              <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>

              {testimonial.projectLink && (
                <a
                  href={testimonial.projectLink}
                  className="inline-flex items-center text-sm text-primary hover:underline gap-2"
                >
                  View Project <FiArrowRight className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

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
