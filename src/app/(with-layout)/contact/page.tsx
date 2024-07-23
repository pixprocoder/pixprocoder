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
      const res = await axios.post(
        "http://localhost:3003/api/v1/contact",
        data
      );

      if (res.status === 200) {
        reset();
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message");
    }
  };

  return (
    <section className=" container mx-auto">
      <SectionBanner>Contact Me</SectionBanner>
      <div className="flex  justify-center items-center">
        <div className="flex mt-[55px] ">
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
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <Input
                {...register("email", { required: true })}
                className="text-purple-800"
                type="email"
                placeholder="Your Email"
              />
              <Input
                {...register("subject", { required: true })}
                className="text-purple-800 my-4"
                type="text"
                placeholder="Subject"
              />

              <Textarea
                {...register("message", { required: true })}
                className="text-purple-800"
                rows={6}
                cols={20}
                placeholder="Message"
              />
              <Button className="mt-4">
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
