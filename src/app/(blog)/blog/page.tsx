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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

function BlogPage() {
  return (
    <section className=" py-14 container mx-auto">
      <div className="">
        <p className="text-2xl font-bold mb-4 ">Enjoy Blogs</p>
      </div>
      <div className="grid gap-4">
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            className="bg-gray-950 border border-gray-800 w-full "
          >
            <CardHeader>
              <CardTitle className="text-white mb-2 font-bold">
                {blog.title}
              </CardTitle>
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex  gap-2">
                  <p className="text-white font-bold text-base">
                    {blog.author}
                  </p>
                  <p className="text-white">{blog.published_date}</p>
                </div>
              </div>
              <CardDescription className="text-gray-300 mt-2">
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
