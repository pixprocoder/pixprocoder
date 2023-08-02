import Image from "next/image";
import faq from "../public/faq.svg";

function FAQPage() {
  return (
    <section className="my-40">
      <h1 className=" mb-8 text-center text-5xl font-montserrat font-bold">
        FAQ
      </h1>
      <div className="flex flex-col lg:flex-row justify-center gap-6">
        <div className="flex-1">
          <Image src={faq} alt="faq" />
        </div>
        <div className="flex-1">
          <div className="join join-vertical w-full">
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" checked="checked" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQPage;
