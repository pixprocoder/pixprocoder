'use client';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { useToast } from '@/src/components/ui/use-toast';
import { contactInfo } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { submitContact } from '@/src/actions/contact';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, Globe, Terminal, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

function ContactPage() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    if (!turnstileToken) {
      toast({
        variant: 'destructive',
        title: 'VERIFICATION_REQUIRED',
        description: 'Please complete the security verification before transmitting.',
      });
      return;
    }

    setIsPending(true);
    const result = await submitContact({ ...data, turnstileToken });
    setIsPending(false);

    if (result.success) {
      toast({
        title: 'TRANSMISSION_SUCCESS',
        description: 'Your message has been logged. I will respond shortly.',
      });
      reset();
      // Reset Turnstile token
      setTurnstileToken(null);
    } else {
      toast({
        variant: 'destructive',
        title: 'TRANSMISSION_ERROR',
        description: result.error || 'Failed to establish connection. Please try again.',
      });
    }
  };

  const formatNumber = (number: string) => {
    return number.replace(/\s+/g, '');
  };

  return (
    <div className="bg-background min-h-screen">
      <section className="container mx-auto py-12 md:py-20">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-mono text-primary mx-auto md:mx-0">
              <Terminal size={14} />
              <span>~/gateway/contact</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Contact <span className="text-primary font-mono italic">gateway.</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
              Initiate a connection for collaborations, technical inquiries, or business opportunities.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>CONNECTION_STABLE</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: System Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl border border-white/10 bg-muted/10 space-y-8 relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14} />
                  System_Endpoint
                </h3>
                <p className="text-sm text-gray-400 font-mono italic">// available_channels</p>
              </div>

              <div className="space-y-6 relative z-10">
                {[
                  { icon: <Mail className="w-5 h-5" />, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
                  { icon: <Phone className="w-5 h-5" />, label: 'Voice', value: contactInfo.phone, href: `tel:${contactInfo.phone}` },
                  { icon: <FaWhatsapp className="w-5 h-5" />, label: 'WhatsApp', value: contactInfo.whatsapp, href: `https://wa.me/${formatNumber(contactInfo.whatsapp!)}` },
                  { icon: <Globe className="w-5 h-5" />, label: 'Region', value: 'Europe 🇪🇺', href: null },
                ].map((item, idx) => (
                  <div key={idx} className="group flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-background border border-white/10 group-hover:border-primary/50 transition-colors text-primary">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-tighter">{item.label}</h4>
                      {item.href ? (
                        <Link href={item.href} className="text-sm md:text-base font-bold text-white hover:text-primary transition-colors font-mono">
                          {item.value}
                        </Link>
                      ) : (
                        <p className="text-sm md:text-base font-bold text-white font-mono">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Modules */}
              <div className="pt-8 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-gray-500 uppercase tracking-tighter">Response_Time:</span>
                  <span className="text-green-500 font-bold">&lt; 24H_OPTIMAL</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-gray-500 uppercase tracking-tighter">Uptime:</span>
                  <span className="text-white font-bold">99.9%_RELIABILITY</span>
                </div>
              </div>

              {/* Decorative background number */}
              <div className="absolute -right-4 -bottom-8 opacity-[0.03] text-[120px] font-mono font-bold select-none pointer-events-none">
                01
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-white/5 bg-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary animate-pulse">
                <CheckCircle size={20} />
              </div>
              <p className="text-xs font-mono text-gray-400 leading-relaxed">
                Encryption active. Your communication is handled through secure protocols.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Transmission Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-3xl border border-white/10 bg-muted/5 space-y-8 relative overflow-hidden group/form">
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <Send size={14} />
                  Initiate_Transmission
                </h3>
                <p className="text-sm text-gray-400 font-mono italic">// payload_configuration</p>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-tighter px-1">User_Auth (Email)</label>
                    <div className="relative">
                      <Input
                        {...register('email', { required: 'IDENT_REQUIRED' })}
                        className={cn(
                          'bg-background/50 border-white/10 focus:border-primary/50 font-mono text-xs h-12 rounded-xl pl-10',
                          errors.email && 'border-red-500/50 focus:border-red-500/50'
                        )}
                        placeholder="user@endpoint.dev"
                      />
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                    {errors.email && <p className="text-[9px] font-mono text-red-500 uppercase px-1">Error: {errors.email.message as string}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-tighter px-1">Subject_Header</label>
                    <div className="relative">
                      <Input
                        {...register('subject', { required: 'HEADER_REQUIRED' })}
                        className={cn(
                          'bg-background/50 border-white/10 focus:border-primary/50 font-mono text-xs h-12 rounded-xl pl-10',
                          errors.subject && 'border-red-500/50 focus:border-red-500/50'
                        )}
                        placeholder="collaboration_query"
                      />
                      <Terminal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                    {errors.subject && <p className="text-[9px] font-mono text-red-500 uppercase px-1">Error: {errors.subject.message as string}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-tighter px-1">Message_Body</label>
                  <div className="relative">
                    <Textarea
                      {...register('message', { required: 'CONTENT_REQUIRED' })}
                      className={cn(
                        'bg-background/50 border-white/10 focus:border-primary/50 font-mono text-xs rounded-xl pl-10 min-h-[180px] pt-4',
                        errors.message && 'border-red-500/50 focus:border-red-500/50'
                      )}
                      placeholder="Enter your message payload here..."
                    />
                    <MessageSquare className="absolute left-3.5 top-4 w-4 h-4 text-gray-500" />
                  </div>
                  {errors.message && <p className="text-[9px] font-mono text-red-500 uppercase px-1">Error: {errors.message.message as string}</p>}
                </div>
              </div>

              <div className="pt-2">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAACzxmgTsXnSDPWoQ'}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => setTurnstileToken(null)}
                  onExpire={() => setTurnstileToken(null)}
                  options={{
                    theme: 'dark',
                  }}
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || isPending || !turnstileToken}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-14 font-mono text-xs font-bold gap-3 uppercase tracking-wider group/btn transition-all shadow-xl shadow-primary/10"
                >
                  {isSubmitting || isPending ? (
                    'TRANSMITTING...'
                  ) : (
                    <>
                      EXEC_SEND_MESSAGE
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>

              {/* Decorative background number */}
              <div className="absolute -right-4 -bottom-8 opacity-[0.03] text-[120px] font-mono font-bold select-none pointer-events-none">
                02
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
