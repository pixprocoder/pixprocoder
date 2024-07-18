import React from "react";

const SectionBanner = ({ children }: any) => {
  return (
    <div
      className="flex  items-center bg-opacity-35 "
      style={{
        backgroundImage: `url("/sectionBanner.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#0c0c0c",
        height: "40vh",
        width: "100%",
        marginTop: "-100px",
        marginBottom: "50px",
        borderRadius: "0 0 10px 10px",
      }}
    >
      <div className="max-w-[1400px] mx-auto flex justify-center items-center ">
        <h1 className=" text-6xl font-black">{children}</h1>
      </div>
    </div>
  );
};

export default SectionBanner;
