import { technologies } from "../constants";
import Image from "next/image";

function Skills() {
  return (
    <section id="skills-section" className="my-40 pt-8">
      <h1 className=" mb-6   font-montserrat font-bold">Skills I have</h1>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {technologies.map((t) => (
          <>
            <div className="rounded  cursor-pointer duration-200 border-blue-500  border ">
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
