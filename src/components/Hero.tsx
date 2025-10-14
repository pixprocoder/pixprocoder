'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FiArrowUpRight } from 'react-icons/fi';
import { SiUpwork } from 'react-icons/si';
import { TbBrandFiverr } from 'react-icons/tb';
import banner from '../assets/images/banner.png';
import Modal from './shared/Modal';
import TypedText from './shared/TypedText';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';

const Hero = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('the quote data is : ', data);
    toast({
      title: 'Email Sent',
      description: 'I will get back to you soon.',
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Tech stack for floating animation
  const techStack = [
    'React',
    'TypeScript',
    'Next.js',
    'Node.js',
    'GraphQL',
    'AWS',
    'MongoDB',
    'PostgreSQL',
  ];

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="container px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <motion.div
          className="space-y-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="mb-2">
              <motion.span
                className="inline-block bg-accent text-accent-foreground text-sm px-4 py-1 rounded-full border border-border"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                Owner & CEO of{' '}
                <Link
                  href="https://pixprocoder-studio.com/"
                  target="_blank"
                  className="hover:text-primary transition-colors bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent font-medium"
                >
                  pixprocoder-studio
                </Link>
              </motion.span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Full-Stack Software Engineer
              </span>
            </h1>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="pl-3 border-l-2 border-primary/50"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-medium">Technologies:</span>
              <TypedText
                className="text-lg font-medium text-foreground/80"
                strings={[
                  'React Ecosystem',
                  'Cloud Architecture',
                  'Full-Stack Solutions',
                  'Scalable Systems',
                ]}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            <Link href="/blog">
              <Button
                variant="outline"
                className="gap-2 px-5 border-border text-foreground hover:bg-accent"
              >
                Explore Blog
                <FiArrowUpRight className="text-sm" />
              </Button>
            </Link>

            <Modal
              trigger={
                <Button className="gap-2 px-5 primary-btn">
                  Get A Quote
                  <FiArrowUpRight className="text-sm" />
                </Button>
              }
              title="Start Your Project"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="w-full  bg-background text-foreground border-border"
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <span className="text-xs text-destructive">
                      Email is required
                    </span>
                  )}
                </div>

                <div>
                  <Input
                    type="text"
                    placeholder="Project Name"
                    className="w-full bg-background text-foreground border-border"
                    {...register('projectName', { required: true })}
                  />
                  {errors.projectName && (
                    <span className="text-xs text-destructive">
                      Project name is required
                    </span>
                  )}
                </div>

                <div>
                  <Textarea
                    placeholder="Your Message"
                    className="w-full h-32 bg-background text-foreground border-border"
                    {...register('message', { required: true })}
                  />
                  {errors.message && (
                    <span className="text-xs text-destructive">
                      Message is required
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <Button type="submit" className="w-full primary-btn">
                    Deliver 🚀
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    or
                  </div>

                  <div className="flex justify-center gap-4">
                    <Link
                      href="https://www.fiverr.com/pixprocoder"
                      target="_blank"
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <TbBrandFiverr className="h-5 w-5" />
                      Fiverr Profile
                    </Link>
                    <Link
                      href="https://www.upwork.com"
                      target="_blank"
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <SiUpwork className="h-5 w-5" />
                      Upwork Profile
                    </Link>
                  </div>
                </div>
              </form>
            </Modal>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          variants={itemVariants}
          className="relative aspect-square bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-xl overflow-hidden border border-border"
        >
          {/* Floating Tech Stack */}
          <div className="absolute inset-0 flex flex-wrap justify-center items-center opacity-10 pointer-events-none">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                className="text-foreground/20 dark:text-foreground/30 font-mono text-lg absolute"
                initial={{
                  scale: 0,
                  rotate: Math.random() * 360,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: index * 0.5,
                }}
              >
                {tech}
              </motion.div>
            ))}
          </div>

          <Image
            src={banner}
            alt="Developer workspace"
            className="object-cover object-center mix-blend-luminosity"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-background/0" />
        </motion.div>
      </div>

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 -z-10 opacity-10 [mask-image:linear-gradient(to_bottom,transparent,black)]">
        <div className="h-full w-full [background-size:24px_24px] [background-image:linear-gradient(to_right,rgba(55,65,81,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(55,65,81,0.2)_1px,transparent_1px)]" />
      </div>
    </section>
  );
};

export default Hero;
