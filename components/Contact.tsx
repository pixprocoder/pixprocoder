import React from "react";

const Contact = () => {
  return (
    <section id="contact-section" className="pt-8 my-40">
      <h1 className=" mb-10 text-center text-5xl font-montserrat font-bold ">
        Have you any question?
      </h1>
      <div className=" ">
        <div className="hero-content flex-col lg:flex-row">
          <div className="card  w-full  shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control my-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control my-2">
                <textarea
                  placeholder="Your message"
                  className="textarea textarea-bordered textarea-md w-full "
                ></textarea>
              </div>

              <div className="form-control my-3">
                <button className="btn outline-none bg-blue-500">Send</button>
              </div>
            </div>
          </div>
          <div className="card  w-full  shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control gap-4 flex-row flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Subscribe to Latest Update"
                  className="input input-bordered w-full "
                />
                <button className="btn ">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
