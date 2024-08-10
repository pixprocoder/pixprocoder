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

function BlogPage() {
  const [data, setData] = useState([]);

  http: useEffect(() => {
    axios(`${getBaseURL()}/posts`).then((res) => setData(res.data?.data));
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
           <>
            {
              blog.id ? <Card
              key={blog?.id}
              className="bg-gray-950 border border-gray-800 w-full"
            >
              <CardHeader>
                <CardTitle className="text-white mb-2 font-bold">
                  {blog ? (
                    blog.title
                  ) : (
                    <Skeleton className="h-6 w-3/4 bg-gray-800" />
                  )}
                </CardTitle>
                <div className="flex gap-3 items-center">
                  <Avatar>
                    {blog ? (
                      <AvatarImage src={blog.image} />
                    ) : (
                      <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
                    )}

                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex gap-2">
                    <p className="text-white font-bold text-base">
                      {blog ? (
                        "Kobir"
                      ) : (
                        <Skeleton className="h-4 w-16 bg-gray-800" />
                      )}
                    </p>
                    <p className="text-white flex gap-2">
                      {blog ? (
                        formattedDate
                      ) : (
                        <Skeleton className="h-4 w-12 bg-gray-800" />
                      )}
                      {blog ? (
                        <small>{formattedTime}</small>
                      ) : (
                        <Skeleton className="h-4 w-8 bg-gray-800" />
                      )}
                    </p>
                  </div>
                </div>
                <CardDescription className="text-gray-300 mt-2">
                  {blog ? (
                    blog.content
                  ) : (
                    <Skeleton className="h-20 w-full bg-gray-800" />
                  )}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <div>
                  {blog ? (
                    <Link href={`/blog/${blog.id}`}>
                      <Button className="w-full">Read More</Button>
                    </Link>
                  ) : (
                    <Skeleton className="h-10 w-full bg-gray-800" />
                  )}
                </div>
              </CardFooter>
            </Card> : 
            <Skeleton
            
            className="bg-gray-950 border border-gray-800 w-full"
          >
            <CardHeader>
              <CardTitle className="text-white mb-2 font-bold">
                
                <Skeleton className="h-6 w-3/4 bg-gray-800" />
              </CardTitle>
              <div className="flex gap-3 items-center">
                <Avatar>
                 
                  <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />

                 
                </Avatar>

                <div className="flex gap-2">
                  <p className="text-white font-bold text-base">
                   
                    <Skeleton className="h-4 w-16 bg-gray-800" />
                  </p>
                  <p className="text-white flex gap-2">
                    
                    <Skeleton className="h-4 w-12 bg-gray-800" />
                   
                    <Skeleton className="h-4 w-8 bg-gray-800" />
                  </p>
                </div>
              </div>
              <CardDescription className="text-gray-300 mt-2">
                
                <Skeleton className="h-20 w-full bg-gray-800" />
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <div>
                {blog ? (
                  <Link href={`/blog/${blog.id}`}>
                    <Button className="w-full">....</Button>
                  </Link>
                ) : (
                  <Skeleton className="h-10 w-full bg-gray-800" />
                )}
              </div>
            </CardFooter>
          </Skeleton>
            }
           </>
          );
        })}
      </div>
    </section>
  );
}

export default BlogPage;
