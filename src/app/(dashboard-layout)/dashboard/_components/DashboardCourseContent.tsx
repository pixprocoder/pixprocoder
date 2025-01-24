import React from "react";
import SingleCourseCardPage from "../card/singleCard";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

function DashboardCourseContent() {
  return (
    <div className="">
      <main>
        {/* top bar */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-4">
            <Link
              className="font-semibold hover:font-bold text-gray-50 hover:text-white"
              href="/"
            >
              Library
            </Link>
            <Link
              className="font-semibold hover:font-bold text-gray-50 hover:text-white"
              href="/"
            >
              Trending
            </Link>
            <Link
              className="font-semibold hover:font-bold text-gray-50 hover:text-white"
              href="/"
            >
              My Resources
            </Link>
          </div>
          <div>
            <Button>Most Popular</Button>
          </div>
        </div>

        {/*  Tutorials */}
        <div>
          {/* Tutorials top bar */}
          <div className="flex justify-between my-6">
            <div>
              <h1 className="font-bold text-xl">Find Tutorial</h1>
              <small className="text-sm text-gray-300">110 Results</small>
            </div>
            <div>
              <Link href="/" className="underline text-sm text-gray-300">
                See All
              </Link>
            </div>
          </div>
          {/* tutorial bottom */}
          <div className="grid grid-cols-4 gap-5">
            <div className="grid gap-5">
              <Button className="w-full h-auto">Popular</Button>

              <Button className="w-full h-auto bg-blue-400 hover:bg-blue-500">
                Latest
              </Button>
            </div>
            <div className="h-36 dashboard-card-bg rounded-2xl p-5">
              Content is coming
            </div>
            <div className="h-36 dashboard-card-bg rounded-2xl p-5">
              Content is coming
            </div>
            <div className="h-36 dashboard-card-bg rounded-2xl p-5">
              Content is coming
            </div>
          </div>
        </div>

        {/*course card  */}
        <div className="mt-10">
          <div>
            <h1>Filter by:</h1>
            <div className="flex justify-between items-center my-5 ">
              <div className="flex gap-4">
                <Button>Tutor </Button>
                <Button>Price</Button>
                <Button>All Level</Button>
                <Button>Reset</Button>
              </div>
              <div>
                <Button>Most Popular</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <SingleCourseCardPage />
            <SingleCourseCardPage />
            <SingleCourseCardPage />
            <SingleCourseCardPage />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardCourseContent;
