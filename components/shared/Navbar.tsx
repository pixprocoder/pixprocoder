"use client";
import Image from "next/image";
import logo from "@/public/vertical-logo.png";
import { navLinks } from "@/constants";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import Button from "./Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(true);

  return (
    <header
      className={`py-4 ${
        isMenuClicked
          ? "fixed top-0 z-10 left-0 w-full bg-[#0f162e] bg-opacity-70"
          : ""
      }`}
    >
      <nav className="container flex justify-between items-center mx-auto font-montserrat">
        <div className="">
          <Link href="/">
            <Image src={logo} width={50} height={50} alt=" logo" />
          </Link>
        </div>

        <div
          className={`absolute lg:static duration-500 z-10 lg:bg-none ${
            open
              ? "top-0 bg-[#101630] bg-opacity-90 mb-6 gap-6 p-6 w-full"
              : "-top-48"
          } flex flex-col lg:flex-row nav-item uppercase`}
        >
          {navLinks.map((link) => (
            <span key={link.key}>
              <ScrollLink
                className="hover:font-bold mr-6 hover:text-[#0084FF] cursor-pointer"
                activeClass="active"
                to={link.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={1000}
                onClick={() => {
                  setIsMenuClicked(!false);
                  setOpen(!open);
                }}
              >
                {link.key}
              </ScrollLink>
            </span>
          ))}
        </div>

        <div>
          <Link href="/blog">
            <Button bgColor="bg-[#0084FF]" title="Blog" />
          </Link>
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
