"use client";
import React from "react";
import { useForm } from "react-hook-form";
const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <section id="contact-section" className="pt-8 my-40">
      <h1 className=" mb-10 text-center text-5xl font-montserrat font-bold ">
        Have you any question?
      </h1>
      <div className=" ">
        <div className="hero-content flex-col lg:flex-row">
          <div className="card  w-full  shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control my-2">
                <input
                  {...register("subject", { required: true })}
                  type="text"
                  placeholder="subject"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control my-2">
                <textarea
                  {...register("message", { required: true })}
                  placeholder="Your message"
                  className="textarea textarea-bordered textarea-md w-full "
                ></textarea>
              </div>
              <div className="form-control my-3">
                <button type="submit" className="btn outline-none bg-blue-500">
                  Send
                </button>
              </div>
            </form>
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
function resetForm() {
  throw new Error("Function not implemented.");
}
