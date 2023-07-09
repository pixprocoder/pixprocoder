import Image from "next/image";
import logo from "@/public/vertical-logo.png";
import { navLinks } from "@/constants";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="py-6">
      <nav className="flex justify-between items-center font-montserrat">
        <div>
          <Link href="/">
            <Image src={logo} width={50} height={50} alt="Pixprocoder logo" />
          </Link>
        </div>
        <div className="">
          <ul className="flex  space-x-6 nav-item uppercase ">
            {navLinks.map((link) => (
              <Link
                className=" hover:font-bold   hover:text-[#0084FF]"
                href={link.href}
                key={link.key}
              >
                {link.key}
              </Link>
            ))}
          </ul>
        </div>
        <button className="nav-item py-2 px-4 bg-[#0084FF] hover:bg-[#2f6aff] rounded-md">
          Hire Me
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
