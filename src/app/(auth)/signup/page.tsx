import SocialAuthCard from '@/src/components/auth/SocialAuthCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create account | pixprocoder',
};

export default function SignupPage() {
  return <SocialAuthCard mode="signup" />;
}
