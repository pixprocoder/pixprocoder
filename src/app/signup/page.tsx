import { Button } from "@/src/components/ui/button";
import loginImg from "../../assets/login.svg";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Mail } from "lucide-react";
import { SiGithub, SiGoogle } from "react-icons/si";
import { Label } from "@/src/components/ui/label";
import { Separator } from "@/src/components/ui/separator";
import { Checkbox } from "@/src/components/ui/checkbox";

const SignupPage = () => {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="">
        <h1 className="text-3xl font-bold mb-2 center">Please Sign up </h1>
        <Card className="bg-gray-950 border border-gray-800 w-full flex justify-between items-center flex-col-reverse lg:flex-row">
          <div className="flex-1 w-full">
            <CardHeader className="pb-0">
              <div>
                <div className="grid w-full max-w-sm items-center ">
                  <Label className="text-white mb-1" htmlFor="name">
                    Name
                  </Label>
                  <Input type="text" id="name" placeholder="Your name" />
                </div>
                <div className="grid w-full max-w-sm items-center my-4">
                  <Label className="text-white mb-1" htmlFor="name">
                    Email
                  </Label>
                  <Input type="email" id="Email" placeholder="Your Email" />
                </div>

                <div className="grid w-full max-w-sm items-center ">
                  <Label className="text-white mb-1" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Your password"
                  />
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox className="border  border-white" id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                      >
                        Accept terms and conditions
                      </label>
                    </div>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      Signup
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
              <Button className="w-full">
                <SiGoogle className="mr-2 h-4 w-4" /> Continue with Google
              </Button>
              <Button className="w-full">
                <SiGithub className="mr-2 h-4 w-4" /> Continue with Github
              </Button>
            </CardFooter>
          </div>
          <div className="flex-1">
            <Image src={loginImg} alt="login" />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SignupPage;
