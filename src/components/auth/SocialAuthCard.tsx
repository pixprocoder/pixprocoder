'use client';

import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/src/components/ui/card';
import { useToast } from '@/src/components/ui/use-toast';
import { AuthContext } from '@/src/providers/AuthProviders';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { SiGithub, SiGoogle } from 'react-icons/si';

type AuthMode = 'login' | 'signup';
type Provider = 'google' | 'github';

const copy: Record<
  AuthMode,
  { title: string; subtitle: string; footer: string; footerHref: string; footerCta: string }
> = {
  login: {
    title: 'Sign in',
    subtitle: 'Continue with Google or GitHub to access your account.',
    footer: "Don't have an account?",
    footerHref: '/signup',
    footerCta: 'Create one',
  },
  signup: {
    title: 'Create an account',
    subtitle: 'Continue with Google or GitHub to get started.',
    footer: 'Already have an account?',
    footerHref: '/login',
    footerCta: 'Sign in',
  },
};

export default function SocialAuthCard({ mode }: { mode: AuthMode }) {
  const { user, loading, signInWithGoogle, signInWithGitHub } =
    useContext(AuthContext);
  const { toast } = useToast();
  const router = useRouter();
  const [pending, setPending] = useState<Provider | null>(null);
  const text = copy[mode];

  useEffect(() => {
    if (!loading && user?.email) {
      router.replace('/');
    }
  }, [user, loading, router]);

  const handleSocialLogin = async (provider: Provider) => {
    const action = provider === 'google' ? signInWithGoogle : signInWithGitHub;
    setPending(provider);
    try {
      await action();
      toast({
        title: mode === 'login' ? 'Signed in' : 'Account ready',
        description: 'Welcome back.',
      });
      router.push('/');
    } catch (error: any) {
      const cancelled =
        error?.code === 'auth/popup-closed-by-user' ||
        error?.code === 'auth/cancelled-popup-request';
      if (!cancelled) {
        toast({
          variant: 'destructive',
          title: 'Sign in failed',
          description: error?.message || 'Something went wrong. Try again.',
        });
      }
    } finally {
      setPending(null);
    }
  };

  return (
    <Card className="w-full max-w-md border-border bg-card shadow-lg">
      <CardHeader className="items-center space-y-4 pt-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/vertical-logo.png"
            alt="pixprocoder"
            width={40}
            height={40}
            className="rounded-lg"
            priority
          />
        </Link>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight py-4">{text.title}</h1>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-8 pb-6">
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full gap-2"
          disabled={pending !== null}
          onClick={() => handleSocialLogin('google')}
        >
          {pending === 'google' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SiGoogle className="h-4 w-4" />
          )}
          Continue with Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full gap-2"
          disabled={pending !== null}
          onClick={() => handleSocialLogin('github')}
        >
          {pending === 'github' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SiGithub className="h-4 w-4" />
          )}
          Continue with GitHub
        </Button>
      </CardContent>

      <CardFooter className="justify-center border-t border-border px-8 py-5">
        <p className="text-sm text-muted-foreground">
          {text.footer}{' '}
          <Link href={text.footerHref} className="font-medium text-primary hover:underline">
            {text.footerCta}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
