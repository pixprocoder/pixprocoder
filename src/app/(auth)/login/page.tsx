import SocialAuthCard from '@/src/components/auth/SocialAuthCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in | pixprocoder',
};

export default function LoginPage() {
  return <SocialAuthCard mode="login" />;
}
