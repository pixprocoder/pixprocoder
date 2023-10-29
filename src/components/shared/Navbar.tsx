"use client";
import logo from "../../assets/vertical-logo.png";
import Link from "next/link";
import { navLinks } from "../../constants";
import { useState } from "react";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar flex justify-between py-4 container mx-auto z-10 bg-[#000000] shadow-md  ">
      <div className="flex-1">
        <Link href="/" className=" font-bold text-xl">
          PIXPROCODER
        </Link>
      </div>

      {isOpen && (
        <ul className=" navItem  flex flex-col  justify-center items-center z-10 gap-6">
          {navLinks.map((el, i) => (
            <Link
              className="mr-4 cursor-pointer hover:font-bold hover:text-blue-500 transition-all duration-100"
              key={i}
              href={el.to}
            >
              {el.key}
            </Link>
          ))}
        </ul>
      )}
      <Button onClick={toggleMenu} className="lg:hidden ">
        Menu
      </Button>

      <ul className="hidden navItem  lg:flex gap-6">
        {navLinks.map((el, i) => (
          <Link
            className="mr-4 cursor-pointer hover:font-bold hover:text-blue-500 transition-all duration-100"
            key={i}
            href={el.to}
          >
            {el.key}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
