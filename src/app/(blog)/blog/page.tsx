'use client';
import { FaLongArrowAltRight } from 'react-icons/fa';

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
import SelectCategoryPage from '@/src/components/shared/SelectCategory';
import SectionBanner from '@/src/components/shared/SectionBanner';

function BlogPage() {
  const { data: posts, isLoading } = useGetPostsQuery({});

  return (
    <section className=" min-h-screen py-14 container mx-auto">
      <div className="hidden md:block">
        <SectionBanner> Enjoy Blog</SectionBanner>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-base md:text-xl  my-4 ">Select Category</p>
        <div>
          <SelectCategoryPage />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
        {isLoading
          ? //@ts-ignore
            Array.from({ length: posts?.length || 3 }).map((_, index) => (
              <Card
                key={index}
                className="bg-gray-950 border border-gray-800 w-full h-full flex flex-col"
              >
                <CardHeader className="flex flex-col flex-grow">
                  {/* Skeleton for Image */}
                  <div className="w-full h-[10rem] md:h-[15rem] overflow-hidden rounded-t-lg bg-gray-800" />

                  <CardDescription className="px-4 py-2 flex flex-col flex-grow">
                    {/* Skeleton for Title */}
                    <Skeleton className="h-6 w-3/4 bg-gray-800 my-2" />

                    {/* Skeleton for Excerpt */}
                    <Skeleton className="h-4 w-full bg-gray-800 mb-2" />
                    <Skeleton className="h-4 w-5/6 bg-gray-800 mb-2" />
                    <Skeleton className="h-4 w-4/6 bg-gray-800" />

                    {/* Read More Skeleton */}
                    <div className="mt-auto pt-4">
                      <div className="group flex gap-2 items-center">
                        <Skeleton className="h-5 w-20 bg-gray-800" />
                        <FaLongArrowAltRight className="text-gray-700 transition-transform duration-300 group-hover:translate-x-2" />
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          : posts?.map((blog: any) => {
              return (
                <Card
                  key={blog.id}
                  className="bg-gray-900 border-none  w-full h-full flex flex-col shadow-lg shadow-gray-900/50"
                >
                  <CardHeader className="flex flex-col flex-grow">
                    {/*  card image */}
                    <div className="w-full h-[10rem] md:h-[15rem]  overflow-hidden rounded-t-lg relative">
                      {blog.thumbnail ? (
                        <Image
                          src={blog.thumbnail}
                          alt="Blog thumbnail"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Image
                            src="/vertical-logo.png"
                            alt="Default thumbnail"
                            width={200}
                            height={200}
                            className="object-contain opacity-50"
                          />
                        </div>
                      )}
                    </div>{' '}
                    <CardDescription className="px-4 py-2 flex flex-col flex-grow">
                      {/* blog title */}
                      <h1 className="text-gray-200 text-base md:text-2xl font-bold my-2">
                        {blog.title}
                      </h1>

                      <p className="text-xs md:text-sm text-gray-300">
                        {blog.excerpt}
                      </p>

                      <div className="mt-auto text-primary pt-4">
                        <Link
                          className="group flex gap-2 underline items-center cursor-pointer"
                          href={`/blog/${blog.id}`}
                        >
                          <span>Read More</span>
                          <FaLongArrowAltRight className="transition-transform duration-300 group-hover:translate-x-2" />
                        </Link>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
      </div>
    </section>
  );
}

export default BlogPage;
