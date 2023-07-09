import Image from "next/image";
import logo from "@/public/vertical-logo.png";
import { navLinks } from "@/constants";
import Link from "next/link";
import Button from "./Button";

const Navbar = () => {
  return (
    <header className="py-8">
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
        <Button bgColor="bg-[#0084FF]" title="Hire Me" />
      </nav>
    </header>
  );
};

export default Navbar;
