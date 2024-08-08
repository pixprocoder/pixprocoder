"use client";
import { Button } from "@/src/components/ui/button";
import loginImg from "../../../assets/login.svg";
import { Card, CardFooter, CardHeader } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Separator } from "@/src/components/ui/separator";
import Image from "next/image";
import { SiGithub, SiGoogle } from "react-icons/si";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "@/src/providers/AuthProviders";

const LoginPage = () => {
  const { signIn, signInWithGoogle, signInWithGitHub } =
    useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signIn(email, password)
      .then((res) => {})
      .catch((error) => {});
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        const user = res.user;
        console.log(user);
      })
      .catch((error) => {});
  };
  const handleGitHubSignIn = () => {
    signInWithGitHub()
      .then((res) => {
        const user = res.user;
        console.log(user);
      })
      .catch((error) => {});
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="">
        <h1 className="text-3xl font-bold mb-2 center">Please Login </h1>
        <Card className="bg-gray-950 border border-gray-800 w-full flex justify-between items-center flex-col-reverse lg:flex-row">
          <div className="flex-1 w-[90vw] md:w-full">
            <CardHeader className="">
              <div>
                <div className="grid w-full max-w-sm items-center my-4">
                  <Label className="text-white mb-1" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    required
                    ref={emailRef}
                    type="email"
                    id="email"
                    placeholder="Your Email"
                  />
                </div>

                <div className="grid w-full max-w-sm items-center ">
                  <Label className="text-white mb-1" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    ref={passwordRef}
                    required
                    type="password"
                    id="password"
                    placeholder="Your password"
                  />
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm md:text-base">
                      Don't have account{" "}
                      <Link className="text-blue-500 underline" href="/signup">
                        Sign up
                      </Link>
                    </span>
                    <Button
                      onClick={handleLogin}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <div className="flex w-28 justify-center items-centers mx-auto">
              <Separator className="my-4" />
              <span className="text-white mx-2">OR</span>
              <Separator className="my-4" />
            </div>
            <CardFooter className="flex flex-col w-full gap-2">
              <Button onClick={handleGoogleSignIn} className="w-full">
                <SiGoogle className="mr-2 h-4 w-4" /> Continue with Google
              </Button>
              <Button onClick={handleGitHubSignIn} className="w-full">
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
