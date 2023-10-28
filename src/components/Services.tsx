import Image from "next/image";
import { services } from "../constants";

const Services = () => {
  return (
    <section id="services" className="pt-8 my-40">
      <h1 className=" mb-16 text-center text-5xl font-montserrat font-bold ">
        Services I Provide
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <>
            <div className="card  transition hover:border-white cursor-pointer duration-200 border-blue-500  border ">
              <div className="card-body items-center text-center">
                <Image
                  width={100}
                  height={100}
                  src={service.icon}
                  alt="Icons"
                />
                <h2 className="card-title">{service.title}</h2>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default Services;
