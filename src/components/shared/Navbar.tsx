"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { navLinks } from "../../constants";
import { Button } from "../ui/button";
import { AuthContext } from "@/src/providers/AuthProviders";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleResponsiveMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then((res: any) => {})
      .catch((error: any) => {});
  };

  return (
    <div className="navbar sticky top-0 flex justify-between py-4 px-4 lg:container mx-auto z-10 bg-[#000000] items-center shadow-lg border-b border-gray-900">
      <div className="flex-1">
        <Link href="/" className="font-bold text-xl">
          PIXPROCODER
        </Link>
      </div>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed rounded-l-3xl top-0 right-0 w-2/3 h-full bg-gray-600 shadow-md p-4 z-50 md:hidden"
      >
        <div
          className="lg:hidden absolute right-4 text-right cursor-pointer z-30"
          onClick={handleResponsiveMenu}
        >
          {isOpen ? (
            <AiOutlineClose className="text-white text-2xl" />
          ) : (
            <GiHamburgerMenu className="text-white text-2xl" />
          )}
        </div>
        <ul className="space-y-4 pt-12 flex flex-col justify-center items-center">
          {navLinks.map((el, i) => (
            <li key={i}>
              <Link
                className="mr-4 cursor-pointer hover:font-bold hover:text-blue-500 transition-all duration-100"
                href={el.to}
              >
                {el.key}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition duration-300">
                SIGN UP
              </Button>
            </Link>
          </li>
        </ul>
      </motion.div>

      <div
        className="lg:hidden cursor-pointer z-30"
        onClick={handleResponsiveMenu}
      >
        {isOpen ? (
          <AiOutlineClose className="text-white text-2xl" />
        ) : (
          <GiHamburgerMenu className="text-white text-2xl" />
        )}
      </div>

      <ul className="hidden navItem lg:flex gap-6 justify-center items-center">
        {navLinks.map((el, i) => (
          <li key={i}>
            <Link
              className="bg-white font-semibold mr-4 cursor-pointer hover:font-bold bg-clip-text text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition-all duration-100"
              href={el.to}
            >
              {el.key}
            </Link>
          </li>
        ))}
        {user ? (
          <Button
            onClick={handleSignOut}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition duration-300"
          >
            LOGOUT
          </Button>
        ) : (
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500  hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition duration-300">
              SIGN UP
            </Button>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
