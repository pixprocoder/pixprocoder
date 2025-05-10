'use client';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { FiGithub, FiMail, FiCode } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { FaInstagramSquare } from 'react-icons/fa';
import { AiFillFacebook } from 'react-icons/ai';
import { FaLinkedin } from 'react-icons/fa';
import { FaSquareGithub } from 'react-icons/fa6';
import Image from 'next/image';

const Footer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <footer className="bg-background/95 backdrop-blur border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-24">
          {/* Brand Column */}
          <div className="space-y-4 flex-1">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                className="hidden md:block"
                width={30}
                height={30}
                src="/vertical-logo.png"
                alt="logo"
              />
              <span className="text-xl font-bold relative">
                PIXPROCODER
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Building digital experiences that matter
            </p>
            <div className="flex flex-row gap-4">
              <Link
                href="https://github.com/pixprocoder"
                target="_blank"
                className="relative group w-fit"
              >
                <FaSquareGithub className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="https://www.instagram.com/pixprocoder"
                className="relative group w-fit"
              >
                <FaInstagramSquare className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />

                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="https://www.facebook.com/pixprocoderr"
                className="relative group w-fit"
              >
                <AiFillFacebook className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />

                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/pixprocoder/"
                className="relative group w-fit"
              >
                <FaLinkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />

                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>

          {/* Links Container */}
          <div className="flex flex-col lg:flex-row flex-1 gap-8 lg:gap-12 xl:gap-24">
            {/* Resources Column */}
            <div className="space-y-4 flex-1">
              <h3 className="text-sm font-semibold relative inline-block">
                Resources
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
              </h3>
              <nav className="flex flex-col space-y-2">
                {['Blog', 'Portfolio', 'Docs', 'Shop'].map((link) => (
                  <Link
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors relative group w-fit"
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal Column */}
            <div className="space-y-4 flex-1">
              <h3 className="text-sm font-semibold relative inline-block">
                Legal
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
              </h3>
              <nav className="flex flex-col space-y-2">
                {['Privacy', 'Terms', 'Cookies'].map((link) => (
                  <Link
                    key={link}
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors relative group w-fit"
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4 flex-1">
            <h3 className="text-sm font-semibold relative inline-block">
              Newsletter
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <motion.div
                className="flex flex-col space-y-2"
                whileHover={{ scale: 1.02 }}
              >
                <Input
                  {...register('email', { required: true })}
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background border-muted/50 focus:border-primary/50"
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    Please enter an email
                  </p>
                )}
                <Button
                  type="submit"
                  size="sm"
                  className="relative overflow-hidden w-fit"
                >
                  <span className="relative z-10">Subscribe</span>
                  <span className="absolute inset-0 bg-primary/10 w-0 group-hover:w-full transition-all duration-300" />
                </Button>
              </motion.div>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PixproCoder. All rights reserved.
            <br />
            <span className="inline-block mt-2">
              Crafted with <span className="text-destructive">❤</span> by
              <Link href="/about" className="ml-1 relative group">
                Samsul Kobir
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
