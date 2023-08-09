import Image from "next/image";
import Link from "next/link";
import logo from "@/public/vertical-logo.png";

function BlogPage() {
  return (
    <section className="bg-gray-800 py-14">
      <div className=" flex justify-around">
        <Link href="/">
          <Image src={logo} width={50} height={50} alt=" logo" />
        </Link>
        <p>Blog is coming soon</p>
      </div>
    </section>
  );
}

export default BlogPage;
