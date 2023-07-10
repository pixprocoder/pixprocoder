"use client";
import Image from "next/image";
import logo from "@/public/vertical-logo.png";
import { navLinks } from "@/constants";
import Link from "next/link";
import Button from "./Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="py-8 ">
      <nav className="flex justify-between items-center mx-4 font-montserrat">
        <div className="">
          <Link href="/">
            <Image src={logo} width={50} height={50} alt=" logo" />
          </Link>
        </div>

        <ul
          className={`absolute lg:static duration-500 z-10  lg:bg-none   ${
            open
              ? "top-0 bg-[#101630]  bg-opacity-90 my-6 gap-6 p-6 w-full "
              : "-top-48 "
          } flex flex-col lg:flex-row nav-item uppercase`}
        >
          {navLinks.map((link) => (
            <Link
              className=" hover:font-bold mr-6   hover:text-[#0084FF]"
              href={link.href}
              key={link.key}
            >
              {link.key}
            </Link>
          ))}
        </ul>

        <div>
          <Button bgColor="bg-[#0084FF]" title="Hire Me" />
        </div>
        <div
          className="lg:hidden block z-20 lg:z-0 "
          onClick={() => setOpen(!open)}
        >
          <span className="cursor-pointer duration-500">
            {open ? (
              <RxCross1 className="text-white text-4xl "></RxCross1>
            ) : (
              <GiHamburgerMenu className="text-white text-4xl "></GiHamburgerMenu>
            )}
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
