"use client";
import logo from "../../assets/vertical-logo.png";
import Link from "next/link";
import { navLinks } from "../../constants";
import { Link as ScrollLink } from "react-scroll/modules";

const Navbar = () => {
  return (
    <div className="navbar flex justify-between py-4 container mx-auto z-10 bg-[#000000] shadow-md ">
      <div className="flex-1">
        <Link href="/" className=" font-bold text-xl">
          PIXPROCODER
        </Link>
      </div>

      <ul className=" navItem  lg:flex gap-6">
        {navLinks.map((el, i) => (
          <span
            className="mr-4 cursor-pointer hover:font-bold hover:text-blue-500 transition-all duration-100"
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
    </div>
  );
};

export default Navbar;
