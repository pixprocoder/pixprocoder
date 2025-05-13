'use client';
import { Button } from '@/src/components/ui/button';
import loginImg from '../../../assets/login.svg';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Separator } from '@/src/components/ui/separator';
import Image from 'next/image';
import { SiGithub, SiGoogle } from 'react-icons/si';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/src/providers/AuthProviders';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/src/components/ui/use-toast';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { Loader2, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const { signIn, user, signInWithGoogle, signInWithGitHub } =
    useContext(AuthContext);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (user?.email) {
      router.push('/');
    }
  }, [user, router, toast]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await signIn(data.userEmail, data.userPassword);
      reset();
      router.push('/');
      toast({ description: 'Login successful 🎉' });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: error.message || 'Login failed',
      });
    }
  };

  const handleSocialLogin = async (provider: () => Promise<any>) => {
    try {
      await provider();
      router.push('/');
      toast({ description: 'Login successful 🎉' });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: error.message || 'Authentication failed',
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <Card className="bg-background/50 backdrop-blur-sm border-border">
          <div className="grid lg:grid-cols-2">
            {/* Image Section */}
            <div className="hidden lg:block relative min-h-[500px]">
              <Image
                src={loginImg}
                alt="Login Illustration"
                fill
                className="object-cover rounded-l-xl"
                priority
              />
            </div>

            {/* Form Section */}
            <div className="p-6 sm:p-8">
              <CardHeader className="space-y-1 p-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground">
                  Sign in to continue to your account
                </p>
              </CardHeader>

              <CardContent className="p-0 mt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative mt-1">
                      <Input
                        {...register('userEmail', {
                          required: 'Email is required',
                        })}
                        id="email"
                        placeholder="name@example.com"
                        className={cn(errors.userEmail && 'border-destructive')}
                      />
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    {errors.userEmail && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.userEmail.message?.toString()}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1">
                      <Input
                        {...register('userPassword', {
                          required: 'Password is required',
                        })}
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        className={cn(
                          errors.userPassword && 'border-destructive',
                        )}
                      />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    {errors.userPassword && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.userPassword.message?.toString()}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                <div className="relative my-6">
                  <Separator className="bg-border" />
                  <span className="absolute left-1/2 -translate-x-1/2 -top-3 px-2 bg-background text-muted-foreground text-sm">
                    OR CONTINUE WITH
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialLogin(signInWithGoogle)}
                  >
                    <SiGoogle className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialLogin(signInWithGitHub)}
                  >
                    <SiGithub className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </CardContent>

              <CardFooter className="p-0 mt-6">
                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link
                    href="/signup"
                    className="font-medium text-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

export default LoginPage;
