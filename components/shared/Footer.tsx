import Image from "next/image";
import logo from "../../public/vertical-logo.png";
import Link from "next/link";
import {
  AiOutlineBehanceSquare,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="footer text-white items-center py-10">
      <div className="items-center grid-flow-col">
        <Link href="/">
          <Image width={30} height={30} src={logo} alt="logo" />
        </Link>
        <p>Copyright © 2023 - All right reserved by Pixprocoder</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link href="https://linkedin.com/in/pixprocoder">
          <AiFillLinkedin className="text-4xl hover:text-blue-500 transition-all duration-200"></AiFillLinkedin>
        </Link>
        <Link href="https://behance.net/pixprocoder">
          <AiOutlineBehanceSquare className="text-4xl hover:text-blue-500 transition-all duration-200"></AiOutlineBehanceSquare>
        </Link>
        <Link href="https://github.com/pixprocoder">
          <AiFillGithub className="text-4xl hover:text-blue-500 transition-all duration-200"></AiFillGithub>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
