'use client';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { cn } from '@/src/lib/utils';
import { getBaseURL } from '@/src/utils';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${getBaseURL()}/contact`, data);
      if (res.status === 200) {
        reset();
        // Consider adding toast notification here
        alert('Message sent successfully 🎉');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message');
    }
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
                <p className="text-muted-foreground">contact@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Social</h3>
                <p className="text-muted-foreground">LinkedIn / Twitter</p>
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
              <label className="text-sm font-medium">Your Email</label>
              <div className="relative mt-1">
                <Input
                  {...register('email', { required: 'Email is required' })}
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
              <label className="text-sm font-medium">Subject</label>
              <div className="relative mt-1">
                <Input
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
              <label className="text-sm font-medium">Message</label>
              <div className="relative mt-1">
                <Textarea
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
