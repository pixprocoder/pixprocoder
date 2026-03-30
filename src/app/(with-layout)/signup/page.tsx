'use client';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Separator } from '@/src/components/ui/separator';
import { useToast } from '@/src/components/ui/use-toast';
import { cn } from '@/src/lib/utils';
import { AuthContext } from '@/src/providers/AuthProviders';
import { motion } from 'framer-motion';
import { Loader2, Lock, Mail, User, Terminal, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SiGithub, SiGoogle } from 'react-icons/si';

const SignupPage = () => {
  const { createUser, user, signInWithGoogle, signInWithGitHub } =
    useContext(AuthContext);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (user?.email) {
      router.push('/');
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await createUser(data.userEmail, data.userPassword);
      reset();
      router.push('/');
      toast({ 
        title: 'ACCOUNT_CREATED',
        description: 'Identity established. Welcome to the ecosystem.' 
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'PROVISION_ERROR',
        description: error.message || 'Account creation failed.',
      });
    }
  };

  const handleSocialLogin = async (provider: () => Promise<any>) => {
    try {
      await provider();
      router.push('/');
      toast({ 
        title: 'AUTH_SUCCESS',
        description: 'Social identity verified. Access granted.' 
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'AUTH_ERROR',
        description: error.message || 'Social authentication failed.',
      });
    }
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[480px]"
      >
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary uppercase tracking-widest">
            <Terminal size={12} />
            <span>~/gateway/auth/register</span>
          </div>
        </div>

        <Card className="bg-muted/10 border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse" />
          
          <CardHeader className="space-y-2 text-center pt-8">
            <h1 className="text-3xl font-bold tracking-tighter text-white">
              Create <span className="text-primary font-mono italic">identity.</span>
            </h1>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-tighter">
              [ Establish_New_User_Node ]
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8 pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest px-1">Display_Name</Label>
                <div className="relative">
                  <Input
                    {...register('userName', {
                      required: 'IDENT_REQUIRED',
                    })}
                    id="name"
                    placeholder="john_doe"
                    className={cn(
                      "bg-background/50 border-white/10 focus:border-primary/50 font-mono text-xs h-12 rounded-xl pl-10 transition-all",
                      errors.userName && 'border-red-500/50 focus:border-red-500/50'
                    )}
                  />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
                {errors.userName && (
                  <p className="text-[9px] font-mono text-red-500 uppercase px-1">
                    Error: {errors.userName.message?.toString()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest px-1">Primary_Endpoint (Email)</Label>
                <div className="relative">
                  <Input
                    {...register('userEmail', {
                      required: 'ENDPOINT_REQUIRED',
                    })}
                    id="email"
                    placeholder="user@endpoint.dev"
                    className={cn(
                      "bg-background/50 border-white/10 focus:border-primary/50 font-mono text-xs h-12 rounded-xl pl-10 transition-all",
                      errors.userEmail && 'border-red-500/50 focus:border-red-500/50'
                    )}
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
                {errors.userEmail && (
                  <p className="text-[9px] font-mono text-red-500 uppercase px-1">
                    Error: {errors.userEmail.message?.toString()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest px-1">Security_Token</Label>
                <div className="relative">
                  <Input
                    {...register('userPassword', {
                      required: 'TOKEN_REQUIRED',
                    })}
                    type="password"
                    id="password"
                    placeholder="••••••••••••"
                    className={cn(
                      "bg-background/50 border-white/10 focus:border-primary/50 font-mono text-xs h-12 rounded-xl pl-10 transition-all",
                      errors.userPassword && 'border-red-500/50 focus:border-red-500/50'
                    )}
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
                {errors.userPassword && (
                  <p className="text-[9px] font-mono text-red-500 uppercase px-1">
                    Error: {errors.userPassword.message?.toString()}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-14 font-mono text-xs font-bold gap-3 uppercase tracking-wider transition-all shadow-xl shadow-primary/10"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    ESTABLISHING...
                  </>
                ) : (
                  <>
                    EXEC_CREATE_ACCOUNT
                    <UserPlus size={16} />
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-8">
              <Separator className="bg-white/5" />
              <span className="absolute left-1/2 -translate-x-1/2 -top-2 px-3 bg-[#0d1117] text-gray-600 text-[9px] font-mono uppercase tracking-widest">
                Fast_Identity_Link
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/30 rounded-xl h-12 font-mono text-[10px] gap-2 uppercase tracking-tighter text-gray-300"
                onClick={() => handleSocialLogin(signInWithGoogle)}
              >
                <SiGoogle size={14} className="text-gray-400" />
                Google
              </Button>
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/30 rounded-xl h-12 font-mono text-[10px] gap-2 uppercase tracking-tighter text-gray-300"
                onClick={() => handleSocialLogin(signInWithGitHub)}
              >
                <SiGithub size={14} className="text-gray-400" />
                GitHub
              </Button>
            </div>
          </CardContent>

          <CardFooter className="px-8 py-6 bg-white/5 border-t border-white/5 flex flex-col gap-4">
            <p className="text-center text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              Existing_User?{' '}
              <Link
                href="/login"
                className="font-bold text-primary hover:underline ml-1"
              >
                ./authorize_session
              </Link>
            </p>
            <div className="flex items-center justify-center gap-2 text-[8px] font-mono text-gray-600">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
               <span>PROTOCOL_STABLE_V4.0</span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </section>
  );
};

export default SignupPage;
