"use client";
import Image from "next/image";
import logo from "@/public/vertical-logo.png";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className=" font-bold text-xl">
          PIXPROCODER
        </Link>
      </div>

      <ul className="hidden  lg:flex gap-6">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Services</li>
        <li>Blog</li>
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
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Services</li>
            <li>Blog</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
