import Facebook from "../../assets/icons/Facebook.svg";
import Instagram from "../../assets/icons/Instagram.svg";
import Twitter from "../../assets/icons/Twitter.svg";
import Linkedin from "../../assets/icons/Linkedin.svg";
import Link from "next/link";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="banner-footer  lg:h-[400px] bg-[#15213C] bg-opacity-50">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-white pt-24">
          <div>
            <h3 className="text-xl font-bold  my-2 lg:mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="hover:text-blue-600 transition-all duration-200"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-600 transition-all duration-200"
                  href="/blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-600 transition-all duration-200"
                  href="/portfolio"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-600 transition-all duration-200"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold  my-2 lg:mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="hover:text-blue-600 transition-all duration-200"
                  href="/"
                >
                  Read Blogs
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-600 transition-all duration-200"
                  href="/"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-600 transition-all duration-200"
                  href="/"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-600 transition-all duration-200"
                  href="/"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold  my-2 lg:mb-4">Follow Me</h3>
            <ul className="space-y-2 text-sm">
              <li>Connect me on social</li>
              <ul className="flex gap-4">
                <li>
                  <Link href="https://www.facebook.com/skpixeel">
                    <Image src={Facebook} alt="facebook" />
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/pixprocoder/">
                    <Image src={Instagram} alt="Instagram" />
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com/pixprocoder">
                    <Image src={Twitter} alt="Twitter" />
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/in/pixprocoder/">
                    <Image src={Linkedin} alt="Linkedin" />
                  </Link>
                </li>
              </ul>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold  my-2 lg:mb-4">Newsletter</h3>
            <ul className="space-y-2 text-sm">
              <li>Stay update with our latest</li>
              <li>
                <div className="flex w-full max-w-sm items-center space-x-2 text-blue-500">
                  <Input
                    className="text-blue-500"
                    type="email"
                    placeholder="Email"
                  />
                  <Button type="submit">Subscribe</Button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center text-white mt-14 text-xs ">
          Copyright ©2023 All rights reserved by |{" "}
          <b className="text-blue-500">Samsul Kobir 💙</b>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
