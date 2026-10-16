import SocialAuthCard from '@/src/components/auth/SocialAuthCard';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Sign in | pixprocoder',
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <Suspense>
      <SocialAuthCard mode="login" next={next} />
    </Suspense>
  );
}
