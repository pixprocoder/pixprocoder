"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { navLinks } from "../../constants";
import { Button } from "../ui/button";
import { AuthContext } from "@/src/providers/AuthProviders";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [active, setActive] = useState<null | number>(null);

  const [isOpen, setIsOpen] = useState(false);
  const handleResponsiveMenu = () => {
    setIsOpen(!isOpen);
  };

  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then((res) => {})
      .catch((error) => {});
  };

  return (
    <div className=" navbar sticky top-0 flex justify-between py-4 px-4 lg:container mx-auto z-10 bg-[#000000] items-center shadow-lg border-b border-gray-900  ">
      <div className="flex-1 ">
        <Link href="/" className=" font-bold text-xl ">
          PIXPROCODER
        </Link>
      </div>

      {isOpen && (
        <ul className=" navItem flex flex-col  justify-center items-center absolute z-10 top-16 left-0 w-full bg-gray-600  gap-4">
          {navLinks.map((el, i) => {
            return (
              <>
                <Link
                  className={`   mr-4 cursor-pointer hover:font-bold hover:text-blue-500 transition-all duration-100`}
                  key={i}
                  href={el.to}
                >
                  {el.key}
                </Link>
              </>
            );
          })}
          <Link className="mb-2" href="/signup">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500  hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition duration-300">
              SIGN UP
            </Button>
          </Link>
        </ul>
      )}

      <GiHamburgerMenu
        onClick={handleResponsiveMenu}
        className="text-white text-2xl lg:hidden cursor-pointer z-30"
      />

      <ul className="hidden navItem  lg:flex gap-6 justify-center items-center">
        {navLinks.map((el, i) => (
          <>
            <Link
              className={` bg-white font-semibold mr-4 cursor-pointer hover:font-bold bg-clip-text text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition-all duration-100`}
              key={i}
              href={el.to}
            >
              {el.key}
            </Link>
          </>
        ))}
        {user ? (
          <Button
            onClick={handleSignOut}
            className="bg-gradient-to-r from-blue-500 to-purple-500  hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition duration-300"
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
