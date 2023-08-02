"use client";
import Image from "next/image";
import logo from "@/public/vertical-logo.png";
import { navLinks } from "@/constants";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import Button from "../Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import NextLink from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  return (
    <header
      className={`py-8 ${
        isMenuClicked
          ? "fixed top-0 left-0 w-full bg-[#101630] bg-opacity-90"
          : ""
      }`}
    >
      <nav className="flex justify-between items-center mx-4 font-montserrat">
        <div className="">
          <Link href="/">
            <Image src={logo} width={50} height={50} alt=" logo" />
          </Link>
        </div>

        <ul
          className={`absolute lg:static duration-500 z-10 lg:bg-none ${
            open
              ? "top-0 bg-[#101630] bg-opacity-90 my-6 gap-6 p-6 w-full"
              : "-top-48"
          } flex flex-col lg:flex-row nav-item uppercase`}
        >
          {navLinks.map((link) => (
            <li key={link.key}>
              {link.external ? (
                <NextLink href={link.to} passHref>
                  <a>{link.key}</a>
                </NextLink>
              ) : (
                <ScrollLink
                  className="hover:font-bold mr-6 hover:text-[#0084FF] cursor-pointer"
                  activeClass="active"
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={1000}
                  onClick={() => setIsMenuClicked(false)}
                >
                  {link.key}
                </ScrollLink>
              )}
              {/* <ScrollLink
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to={`#${link.to}`}
              >
                {link.key}
                <span className="hover:font-bold mr-6 hover:text-[#0084FF]">
                </span>
              </ScrollLink> */}
            </li>
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
