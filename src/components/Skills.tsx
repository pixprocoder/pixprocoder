import { technologies } from "../constants";
import Image from "next/image";

function Skills() {
  return (
    <section id="skills-section" className="my-40 pt-8">
      <h1 className=" mb-6 text-center text-5xl font-montserrat font-bold">
        Skills I have
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {technologies.map((t) => (
          <>
            <div className="rounded hover:bg-blue-300 transition hover:border-none cursor-pointer duration-200 border-blue-500  border ">
              <div className="flex gap-2 p-2 items-center text-center">
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
