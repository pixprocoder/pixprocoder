"use client";
import { useEffect, useState } from "react";
import axios from "axios";
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
import SelectCategoryPage from "@/src/components/shared/SelectCategory";
import Link from "next/link";
import { format } from "date-fns";
import SectionBanner from "@/src/components/shared/SectionBanner";

function BlogPage() {
  const [data, setData] = useState([]);
  //localhost:3003/api/v1/posts
  // https://pixprocoder-backend-pixprocoder.vercel.app/api/v1/posts/
  http: useEffect(() => {
    axios("http://localhost:3003/api/v1/posts").then((res) =>
      setData(res.data?.data)
    );
  }, []);

  // Date format
  const formatDateString = (dateString: any) => {
    const date = new Date(dateString);
    const formattedDate = format(date, "yy/MM/dd");
    const formattedTime = format(date, "H:mm:ss");
    return { formattedDate, formattedTime };
  };

  return (
    <section className=" min-h-screen py-14 container mx-auto">
      <SectionBanner>Blog</SectionBanner>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold my-4 ">Enjoy Blogs</p>
        <div>
          <SelectCategoryPage />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((blog: any) => {
          const { formattedDate, formattedTime } = formatDateString(
            blog.createdAt
          );
          return (
            <Card
              key={blog?.id}
              className="bg-gray-950 border border-gray-800 w-full "
            >
              <CardHeader>
                <CardTitle className="text-white mb-2 font-bold">
                  {blog.title}
                </CardTitle>
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={blog.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex  gap-2">
                    <p className="text-white font-bold text-base">Kobir</p>
                    <p className="text-white flex gap-2">
                      {formattedDate}
                      <small>{formattedTime}</small>
                    </p>
                  </div>
                </div>
                <CardDescription className="text-gray-300 mt-2">
                  {blog.content}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <div>
                  <Link href={`/blog/${blog.id}`}>
                    <Button className="w-full">Read More</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default BlogPage;
