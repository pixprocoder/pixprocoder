'use client';
import { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Skeleton } from '@/src/components/ui/skeleton';
import { useGetPostsQuery } from '@/src/redux/api/posts/PostApiSlice';
import { getBaseURL } from '@/src/utils';
import { formatDateToUTC, formatTimeToUTC } from '@/src/utils/FormatDate';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import RenderHTML from '@/src/components/RenderHTML';
import RenderContent from '@/src/components/RenderContent';

function BlogPage() {
  const { data: posts, isLoading } = useGetPostsQuery({});

  return (
    <section className=" min-h-screen py-14 container mx-auto">
      {/* <SectionBanner>Blog</SectionBanner>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold my-4 ">Enjoy Blogs</p>
        <div><SelectCategoryPage /></div>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading
          ? //@ts-ignore
            Array.from({ length: posts?.length || 2 }).map((_, index) => (
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
          : posts?.map((blog: any) => {
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
                        <AvatarImage src={blog.thumbnail} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-white font-bold text-base">
                          Samsul Kobir
                        </p>
                        <p className="text-gray-300 text-sm flex gap-2 items-center">
                          {formatDateToUTC(blog?.createdAt)}{' '}
                          <small className="text-xs">at</small>
                          <small>{formatTimeToUTC(blog?.createdAt)}</small>
                        </p>
                      </div>
                    </div>
                    <CardDescription className="text-gray-300 mt-2">
                      {/* <Image */}
                      {/*   width={500} */}
                      {/*   height={500} */}
                      {/*   src={blog ? blog?.thumbnail : '/vertical-logo.png'} */}
                      {/*   alt="preview Image" */}
                      {/* /> */}
                      {blog.thumbnail ? (
                        <img src={blog.thumbnail} />
                      ) : (
                        <img
                          src="vertical-logo.png
"
                        />
                      )}
                      <RenderContent content={blog.content} />
                      {/* <RenderHTML content={blog.content} /> */}
                      {/* <div dangerouslySetInnerHTML={{ __html: blog.content }} /> */}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href={`/blog/${blog.id}`}>
                      <Button className="w-full primary-btn">Read More</Button>
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
