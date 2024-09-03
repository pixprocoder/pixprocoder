"use client";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import SingleCourseCardPage from "./card/singleCard";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/src/providers/AuthProviders";
import { useRouter } from "next/navigation";
import LoadingPage from "../loading";

const DashboardPage = () => {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  user?.email ? router.push("/dashboard") : router.push("/login");

  return (
    <section className="max-w-[1600px] mx-auto">
      <div className="dashboard-container  gap-5">
        {/* Left side bar */}
        <div className="  ">
          <div className="flex flex-col justify-between h-screen dashboard-card-bg  p-2 text-sm">
            <div>
              <Button className="w-full">
                <Link href="/">MY Dashboard</Link>
              </Button>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                <li>
                  <Button className="w-full">
                    <Link href="/">Home</Link>
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <Button className="w-full">
                <Link href="/">Logout</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Middle bar */}

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

        {/* Right bar */}
        {/* <div className="">
          <aside className="dashboard-aside  gap-5 h-screen ">
            <div className="dashboard-card-bg rounded-2xl p-2">Top</div>
            <div className="dashboard-card-bg rounded-2xl p-2">Bottom</div>
          </aside>
        </div> */}
      </div>
    </section>
  );
};

export default DashboardPage;
