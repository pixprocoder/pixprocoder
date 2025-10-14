'use client';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { useToast } from '@/src/components/ui/use-toast';
import { contactInfo } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { getBaseURL } from '@/src/utils';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LocateIcon, Mail, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FaWhatsapp } from 'react-icons/fa';

function ContactPage() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post(`${getBaseURL()}/contact`, data);
      if (res.status === 200) {
        toast({ description: 'Message sent successful 🎉' });
        reset();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message');
    }
  };

  // Format number for whatsapp
  const formatNumber = (number: string) => {
    return number.replace(/\s+/g, '');
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 mt-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8 p-6 bg-background/50 rounded-xl border border-border"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Contact Information
            </h2>
            <p className="text-muted-foreground">
              Fill out the form or use one of these methods to reach me
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <Link
                  href={`mailto:${contactInfo.email}`}
                  className="text-muted-foreground"
                >
                  {contactInfo.email}
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <Link
                  href={`tel:${contactInfo.phone}`}
                  className="text-muted-foreground"
                >
                  {contactInfo.phone}
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <FaWhatsapp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">WhatsApp</h3>
                <Link
                  href={`https://wa.me/${formatNumber(contactInfo.whatsapp!)}`}
                  className="text-muted-foreground"
                >
                  {contactInfo.whatsapp}
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <LocateIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Region</h3>
                <p className="text-muted-foreground">Europe 🇪🇺</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-6 bg-background/50 rounded-xl border border-border"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Your Email
              </label>
              <div className="relative mt-1">
                <Input
                  {...register('email', { required: 'Email is required' })}
                  id="email"
                  type="email"
                  className={cn('pl-10', errors.email && 'border-red-500')}
                  placeholder="name@example.com"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <div className="relative mt-1">
                <Input
                  id="subject"
                  type="text"
                  {...register('subject', { required: 'Subject is required' })}
                  className={cn('pl-10', errors.subject && 'border-red-500')}
                  placeholder="What's this about?"
                />
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              {errors.subject && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <div className="relative mt-1">
                <Textarea
                  id="message"
                  {...register('message', { required: 'Message is required' })}
                  className={cn('pl-10', errors.message && 'border-red-500')}
                  rows={5}
                  placeholder="Your message..."
                />
                <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-muted-foreground" />
              </div>
              {errors.message && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}

export default ContactPage;
