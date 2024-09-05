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
import { getBaseURL } from "@/src/utils";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useGetPostsQuery } from "@/src/redux/api/posts/PostApiSlice";

function BlogPage() {
  const { data: posts, isLoading } = useGetPostsQuery({});
  console.log("blgo posts using RTK", posts?.data);

  // Date format
  const formatDateString = (dateString: any) => {
    const date = new Date(dateString);
    const formattedDate = format(date, "yy/MM/dd");
    const formattedTime = format(date, "H:mm:ss");
    return { formattedDate, formattedTime };
  };
  // skeleton length count to show on the ui

  return (
    <section className=" min-h-screen py-14 container mx-auto">
      {/* <SectionBanner>Blog</SectionBanner>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold my-4 ">Enjoy Blogs</p>
        <div><SelectCategoryPage /></div>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading
          ? Array.from({ length: posts?.data?.length || 2 }).map((_, index) => (
              <Card
                key={index}
                className="bg-gray-950 border border-gray-800 w-full"
              >
                <CardHeader>
                  <CardTitle className="mb-2">
                    <Skeleton className="h-6 w-3/4 bg-gray-800" />
                  </CardTitle>
                  <div className="flex gap-3 items-center">
                    <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
                    <div className="flex gap-2">
                      <Skeleton className="h-4 w-16 bg-gray-800" />
                      <Skeleton className="h-4 w-12 bg-gray-800" />
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    <Skeleton className="h-20 w-full bg-gray-800" />
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Skeleton className="h-10 w-full bg-gray-800" />
                </CardFooter>
              </Card>
            ))
          : posts?.data?.map((blog: any) => {
              const { formattedDate, formattedTime } = formatDateString(
                blog.createdAt
              );
              return (
                <Card
                  key={blog.id}
                  className="bg-gray-950 border border-gray-800 w-full"
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
                      <div className="flex gap-2">
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
                    <Link href={`/blog/${blog.id}`}>
                      <Button className="w-full">Read More</Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
      </div>
    </section>
  );
}

export default BlogPage;
