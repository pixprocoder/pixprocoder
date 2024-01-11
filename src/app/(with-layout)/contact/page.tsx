"use client";
import { Button } from "@/src/components/ui/button";
import Aos from "aos";
import Image from "next/image";
import { useEffect } from "react";
import contact from "../../../assets/login.svg";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";

function ContactPage() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <section className="min-h-screen container mx-auto">
      <h1 className="text-center">Contact Me</h1>
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
            <form className="flex flex-col">
              <Input
                className="text-purple-800"
                type="text"
                name=""
                id=""
                placeholder="Subject"
              />
              <Input
                className="text-purple-800 my-4"
                type="email"
                name=""
                id=""
                placeholder="Email"
              />
              <Textarea
                className="text-purple-800"
                rows={6}
                cols={20}
                name=""
                id=""
                placeholder="Message"
              />
              <div className="mt-2">
                <Button>Send</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
