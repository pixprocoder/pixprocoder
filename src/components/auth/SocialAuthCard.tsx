'use client';

import { Button } from '@/src/components/ui/button';
import { safeNextPath, withNext } from '@/src/lib/auth-redirect';
import { AuthContext } from '@/src/providers/AuthProviders';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { SiGithub, SiGoogle } from 'react-icons/si';
import { toast } from 'sonner';

type AuthMode = 'login' | 'signup';
type Provider = 'google' | 'github';

const copy: Record<
  AuthMode,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    footer: string;
    footerHref: '/login' | '/signup';
    footerCta: string;
  }
> = {
  login: {
    eyebrow: 'Account',
    title: 'Welcome back',
    subtitle: 'Continue with Google or GitHub. You will return to where you left off.',
    footer: "Don't have an account?",
    footerHref: '/signup',
    footerCta: 'Create one',
  },
  signup: {
    eyebrow: 'Account',
    title: 'Create an account',
    subtitle: 'Google or GitHub is enough. No password to remember.',
    footer: 'Already have an account?',
    footerHref: '/login',
    footerCta: 'Sign in',
  },
};

export default function SocialAuthCard({
  mode,
  next: nextProp,
}: {
  mode: AuthMode;
  next?: string;
}) {
  const { user, loading, signInWithGoogle, signInWithGitHub } =
    useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNextPath(nextProp ?? searchParams.get('next'));
  const [pending, setPending] = useState<Provider | null>(null);
  const text = copy[mode];

  useEffect(() => {
    if (!loading && user?.email) {
      router.replace(next);
    }
  }, [user, loading, router, next]);

  const handleSocialLogin = async (provider: Provider) => {
    const action = provider === 'google' ? signInWithGoogle : signInWithGitHub;
    setPending(provider);
    try {
      await action();
      toast.success(mode === 'login' ? 'Signed in' : 'Account ready', {
        description: 'Welcome back.',
      });
      router.replace(next);
    } catch (error: unknown) {
      const code =
        error && typeof error === 'object' && 'code' in error
          ? String((error as { code?: string }).code)
          : '';
      const cancelled =
        code === 'auth/popup-closed-by-user' ||
        code === 'auth/cancelled-popup-request';
      if (!cancelled) {
        const message =
          error && typeof error === 'object' && 'message' in error
            ? String((error as { message?: string }).message)
            : 'Something went wrong. Try again.';
        toast.error('Sign in failed', { description: message });
      }
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-md">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.18em] text-primary">
        {text.eyebrow}
      </p>
      <div className="rounded-2xl border border-border bg-card/80 px-6 py-8 shadow-lg backdrop-blur-xl sm:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="mb-5 inline-flex items-center gap-2">
            <Image
              src="/vertical-logo.png"
              alt="pixprocoder"
              width={40}
              height={40}
              className="rounded-lg"
              priority
            />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {text.title}
          </h1>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {text.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full gap-2 rounded-xl"
            disabled={pending !== null}
            onClick={() => handleSocialLogin('google')}
          >
            {pending === 'google' ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <SiGoogle className="size-4" />
            )}
            Continue with Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full gap-2 rounded-xl"
            disabled={pending !== null}
            onClick={() => handleSocialLogin('github')}
          >
            {pending === 'github' ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <SiGithub className="size-4" />
            )}
            Continue with GitHub
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {text.footer}{' '}
          <Link
            href={withNext(text.footerHref, next)}
            className="font-medium text-primary hover:underline"
          >
            {text.footerCta}
          </Link>
        </p>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href={next} className="hover:text-foreground">
          Back to site
        </Link>
      </p>
    </div>
  );
}
