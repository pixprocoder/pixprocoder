"use client";
import Image from "next/image";
import faq from "../public/faq.svg";
import { useState } from "react";
import { faqItems } from "@/constants";

function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index: any) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="my-40">
      <h1 className=" mb-8 text-center text-5xl font-montserrat font-bold">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
        <div className="flex-1">
          <Image src={faq} alt="faq" />
        </div>
        <div className="flex-1">
          <div className="join join-vertical  gap-2 w-full">
            {faqItems.map((item, index) => (
              <div
                className={`collapse collapse-plus join-item  ${
                  activeIndex === index ? "active" : ""
                } transition ease-in-out duration-300`}
                key={index}
              >
                <input
                  type="radio"
                  name="my-accordion-3"
                  onChange={() => handleToggle(index)}
                />
                <div
                  className={`collapse-title text-xl font-montserrat font-medium ${
                    activeIndex === index
                      ? "text-white bg-blue-500"
                      : "text-blue-500"
                  } transition ease-in-out duration-300`}
                >
                  {item.question}
                </div>
                {activeIndex === index && (
                  <div className="collapse-content">
                    <p className={`mt-3 font-raleway`}>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQPage;
