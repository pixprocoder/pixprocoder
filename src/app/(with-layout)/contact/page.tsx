'use client';

import { submitContact } from '@/src/actions/contact';
import { Reveal } from '@/src/components/motion/Reveal';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { useToast } from '@/src/components/ui/use-toast';
import { contactInfo } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { Turnstile } from '@marsidev/react-turnstile';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import Link from 'next/link';

const TIME_ZONE = 'Europe/Bucharest';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/pixprocoder',
    icon: FiGithub,
  },
  {
    label: 'X',
    href: 'https://x.com/pixprocoder',
    icon: FaXTwitter,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/pixprocoder',
    icon: FiLinkedin,
  },
];

function formatWhatsApp(number: string) {
  return number.replace(/\s+/g, '');
}

function useAround(timeZone: string) {
  const [around, setAround] = useState<boolean | null>(null);

  useEffect(() => {
    const hour = Number(
      new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: 'numeric',
        hour12: false,
      }).format(new Date()),
    );
    setAround(hour >= 9 && hour < 18);
  }, [timeZone]);

  return around;
}

type ContactFormValues = {
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const { toast } = useToast();
  const around = useAround(TIME_ZONE);
  const [isPending, setIsPending] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>();

  const onSubmit = async (data: ContactFormValues) => {
    if (!turnstileToken) {
      toast({
        variant: 'destructive',
        title: 'Verification needed',
        description: 'Complete the check below, then send again.',
      });
      return;
    }

    setIsPending(true);
    const result = await submitContact({ ...data, turnstileToken });
    setIsPending(false);

    if (result.success) {
      toast({
        title: 'Message sent',
        description: "I'll get back to you soon.",
      });
      reset();
      setTurnstileToken(null);
    } else {
      toast({
        variant: 'destructive',
        title: 'Could not send',
        description: result.error || 'Try again in a moment.',
      });
    }
  };

  const channels = [
    {
      label: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      icon: FiMail,
    },
    {
      label: 'Phone',
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
      icon: FiPhone,
    },
    {
      label: 'WhatsApp',
      value: contactInfo.whatsapp,
      href: `https://wa.me/${formatWhatsApp(contactInfo.whatsapp)}`,
      icon: FaWhatsapp,
    },
  ];

  const sending = isSubmitting || isPending;

  return (
    <section className="py-16 sm:py-24">
      <Reveal className="mb-12 max-w-xl space-y-4 sm:mb-16">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
          Contact
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Let&apos;s build something.
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          An idea, a product, or a problem that needs a clear interface. I work
          remotely across the EU, invoiced through Pixprocoder Studio SRL.
        </p>
        <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="relative flex size-2">
            {around && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            )}
            <span
              className={`relative inline-flex size-2 rounded-full ${
                around === false
                  ? 'bg-muted-foreground/50'
                  : 'bg-emerald-400'
              }`}
            />
          </span>
          {around === false ? 'Away · replies next morning' : 'Around · usually replies today'}
          <span className="text-border">·</span>
          <span>Bucharest</span>
        </p>
      </Reveal>

      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <aside className="space-y-8">
          <ul className="space-y-5">
            {channels.map((channel) => (
              <li key={channel.label}>
                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                  {channel.label}
                </p>
                <Link
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    channel.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary sm:text-base"
                >
                  <channel.icon className="size-4 shrink-0" />
                  {channel.value}
                </Link>
              </li>
            ))}
          </ul>

          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
              Social
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <social.icon className="size-4" />
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-2xl border border-border bg-card p-5 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                {...register('email', { required: 'Email is required' })}
                className={cn(
                  'h-11 rounded-xl',
                  errors.email && 'border-destructive',
                )}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-foreground">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="What are we building?"
                {...register('subject', { required: 'Subject is required' })}
                className={cn(
                  'h-11 rounded-xl',
                  errors.subject && 'border-destructive',
                )}
              />
              {errors.subject && (
                <p className="text-xs text-destructive">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Tell me about the project, timeline, and what you need."
              {...register('message', { required: 'Message is required' })}
              className={cn(
                'min-h-40 rounded-xl',
                errors.message && 'border-destructive',
              )}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message.message}</p>
            )}
          </div>

          <Turnstile
            siteKey={
              process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
              '0x4AAAAAACzxmgTsXnSDPWoQ'
            }
            onSuccess={(token) => setTurnstileToken(token)}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
            options={{ theme: 'dark' }}
          />

          <Button
            type="submit"
            disabled={sending || !turnstileToken}
            className="h-11 w-full rounded-xl sm:w-auto sm:px-8"
          >
            {sending ? 'Sending…' : 'Send message'}
          </Button>
        </form>
      </div>
    </section>
  );
}
