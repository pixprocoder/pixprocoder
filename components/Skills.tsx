import { technologies } from "@/constants";
import Image from "next/image";
import React from "react";

function Skills() {
  return (
    <section>
      <h1 className=" mb-6 text-center text-5xl font-montserrat font-bold">
        Skills I have
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {technologies.map((t) => (
          <>
            <div className="card hover:bg-blue-300 transition hover:border-none cursor-pointer duration-200  border ">
              <div className="card-body items-center text-center">
                <Image width={50} height={50} src={t.icon} alt="Icons" />
                <h2 className="card-title">{t.name}</h2>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
}

export default Skills;
