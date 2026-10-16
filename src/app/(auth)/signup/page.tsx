import SocialAuthCard from '@/src/components/auth/SocialAuthCard';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Create account | pixprocoder',
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <Suspense>
      <SocialAuthCard mode="signup" next={next} />
    </Suspense>
  );
}
