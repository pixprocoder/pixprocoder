import React from "react";

const Contact = () => {
  return (
    <section className="my-40">
      <h1 className=" text-center text-5xl font-montserrat font-bold ">
        Get in touch
      </h1>
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row">
          <div className="card  w-full  shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Send</button>
              </div>
            </div>
          </div>
          <div className="card  w-full  shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Subscribe to newsletter"
                  className="input input-bordered"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
