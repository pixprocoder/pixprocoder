"use client";
import { Button } from "@/src/components/ui/button";
import Aos from "aos";
import Image from "next/image";
import { useEffect } from "react";
import contact from "../../../assets/login.svg";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import SectionBanner from "@/src/components/shared/SectionBanner";
import axios from "axios";
import { getBaseURL } from "@/src/utils";

function ContactPage() {
  useEffect(() => {
    Aos.init();
  }, []);

  // Handling from

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const res = await axios.post(`${getBaseURL()}/contact`, data);
      console.log(res?.data);
      console.log(process.env.NEXT_PUBLIC_API_URL);

      if (res.status === 200) {
        reset();
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      // alert("Failed to send message");
    }
  };

  return (
    <section className=" container mx-auto">
      <div className="flex  justify-center items-center  min-h-screen">
        <div className="flex mt-[55px] md:my-0 my-20 ">
          <div className=" flex-1 hidden lg:block">
            <Image
              data-aos-duration="1000"
              data-aos="fade-up"
              src={contact}
              alt="profile"
            />
          </div>
          <div
            data-aos-duration="1000"
            data-aos="zoom-in"
            className="flex-1 w-full lg:ml-8"
          >
            <h1 className="text-2xl my-4 block md:hidden">Contact with me</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-[90vw] md:w-full flex-col"
            >
              <Input
                {...register("email", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
                className="text-purple-800"
                type="email"
                placeholder="Your Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-sm text-red-700" role="alert">
                  Email is required
                </p>
              )}
              <div className="my-4">
                <Input
                  {...register("subject", { required: true })}
                  aria-invalid={errors.subject ? "true" : "false"}
                  className="text-purple-800 "
                  type="text"
                  placeholder="Subject"
                />
                {errors.subject?.type === "required" && (
                  <p className="text-sm text-red-700" role="alert">
                    Subject is required
                  </p>
                )}
              </div>

              <Textarea
                {...register("message", { required: true })}
                aria-invalid={errors.message ? "true" : "false"}
                className="text-purple-800"
                rows={6}
                cols={20}
                placeholder="Message"
              />
              {errors.message?.type === "required" && (
                <p className="text-sm text-red-700" role="alert">
                  Message is required
                </p>
              )}
              <Button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition duration-300">
                <input className="cursor-pointer" type="submit" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
