'use client';
import { Button } from '@/src/components/ui/button';
import loginImg from '../../../assets/login.svg';
import { Card, CardFooter, CardHeader } from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Separator } from '@/src/components/ui/separator';
import Image from 'next/image';
import { SiGithub, SiGoogle } from 'react-icons/si';
import Link from 'next/link';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '@/src/providers/AuthProviders';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/src/components/ui/use-toast';

const LoginPage = () => {
  const { signIn, signInWithGoogle, signInWithGitHub } =
    useContext(AuthContext);
  const { toast } = useToast();
  const router = useRouter();

  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    const email = data.userEmail;
    const password = data.userPassword;

    signIn(email, password)
      .then((res: any) => {
        reset();
        router.push('/');
        toast({
          variant: 'outline',
          description: 'Login successful',
        });
      })
      .catch((err: any) => {
        setError(err.message);
      });
  };

  // Handling Social login
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res: any) => {
        router.push('/');
        toast({
          variant: 'outline',
          description: 'Login successful',
        });
      })
      .catch((error: any) => {
        setError(error.message);
      });
  };
  const handleGitHubSignIn = () => {
    signInWithGitHub()
      .then((res: any) => {
        router.push('/');
        toast({
          variant: 'outline',
          description: 'Login successful',
        });
      })
      .catch((error: any) => {
        setError(error.message);
      });
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="">
        <h1 className="text-3xl font-bold mb-2 center">Please login</h1>
        <Card className="bg-gray-950 border border-gray-800 w-full flex justify-between items-center flex-col-reverse lg:flex-row">
          <div className="flex-1 w-[90vw] md:w-full">
            <CardHeader className="px-4 py-2 ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full max-w-sm items-center my-4">
                  <Label className="text-white mb-1" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    {...register('userEmail', { required: true })}
                    aria-invalid={errors.userEmail ? 'true' : 'false'}
                    type="email"
                    id="email"
                    placeholder="Your Email"
                  />
                  {errors.userEmail && (
                    <p className="text-red-500 text-xs" role="alert">
                      Email is Required
                    </p>
                  )}
                </div>

                <div className="grid w-full max-w-sm items-center ">
                  <Label className="text-white mb-1" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    {...register('userPassword', { required: true })}
                    aria-invalid={errors?.userPassword ? 'true' : 'false'}
                    type="password"
                    id="password"
                    placeholder="Your password"
                  />
                  {errors.userPassword && (
                    <p className="text-red-500 text-xs" role="alert">
                      Password is Required
                    </p>
                  )}
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm md:text-base">
                      Don't have account{' '}
                      <Link className="text-blue-500 underline" href="/signup">
                        Sign Up
                      </Link>
                    </span>
                    <Button type="submit" className="primary-btn">
                      Login
                    </Button>
                  </div>
                </div>
              </form>
              {error && <p className="text-red-500 text-xs">{error}</p>}
            </CardHeader>
            <div className="flex w-28 justify-center items-centers mx-auto">
              <Separator className="my-4" />
              <span className="text-white mx-2">OR</span>
              <Separator className="my-4" />
            </div>
            <CardFooter className="flex flex-col w-full gap-2">
              <Button
                onClick={handleGoogleSignIn}
                className="w-full primary-btn"
              >
                <SiGoogle className="mr-2 h-4 w-4" /> Continue with Google
              </Button>
              <Button
                onClick={handleGitHubSignIn}
                className="w-full secondary-btn"
              >
                <SiGithub className="mr-2 h-4 w-4" /> Continue with Github
              </Button>
            </CardFooter>
          </div>
          <div className="flex-1 hidden lg:flex">
            <Image src={loginImg} alt="login" />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
