"use client";
import Image from "next/image";
import logo from "@/public/vertical-logo.png";
import Link from "next/link";
import { navLinks } from "@/constants";
import { Link as ScrollLink } from "react-scroll/modules";

const Navbar = () => {
  return (
    <div className="navbar fixed top-0 container mx-auto z-10 bg-[#000000] shadow-md ">
      <div className="flex-1">
        <Link href="/" className=" font-bold text-xl">
          PIXPROCODER
        </Link>
      </div>

      <ul className="hidden navItem  lg:flex gap-6">
        {navLinks.map((el, i) => (
          <span
            className="cursor-pointer hover:font-bold hover:text-blue-500 transition-all duration-100"
            key={i}
          >
            <ScrollLink
              spy={true}
              smooth={true}
              offset={-70}
              duration={1000}
              to={el.to}
            >
              {el.key}
            </ScrollLink>
          </span>
        ))}
        {/* <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Services</li>
        <li>Blog</li> */}
      </ul>

      <div className="block lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image src={logo} alt="logo" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1]  shadow gap-4 bg-black p-4 rounded-box w-52"
          >
            {navLinks.map((el, i) => (
              <span
                className="cursor-pointer hover:font-bold hover:text-blue-500"
                key={i}
              >
                <ScrollLink
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={1000}
                  to={el.to}
                >
                  {el.key}
                </ScrollLink>
              </span>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
