import Image from "next/image";
import Link from "next/link";
import logo from "@/public/vertical-logo.png";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { blogs } from "@/src/constants";

function BlogPage() {
  return (
    <section className=" py-14 container mx-auto">
      <div className=" flex justify-around">
        <Link href="/">
          <Image src={logo} width={50} height={50} alt=" logo" />
        </Link>
        <p>Blog is coming soon</p>
      </div>
      <div className="grid gap-4">
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            className="bg-gray-950 border border-gray-800 w-full "
          >
            <CardHeader>
              <Link href={`/portfolio/`}>
                <div className="  rounded-lg flex justify-center overflow-hidden">
                  {/* <img
                  src={image}
                  alt="Image"
                  className="transform transition-transform duration-500 hover:scale-125"
                /> */}
                  img
                </div>
              </Link>
              <CardTitle className="text-white  font-bold">
                {blog.title}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {blog.description}
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <div>
                <Button className="w-full">Read More</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default BlogPage;
