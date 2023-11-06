import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <section className="max-w-[1280px] mx-auto">
      <div className="dashboard-container  gap-5">
        {/* Left side bar */}
        <div className="  ">
          <div className="flex flex-col justify-between h-screen dashboard-card-bg  p-2 text-sm">
            <div>
              <Button className="w-full">
                <Link href="/">Kobir</Link>
              </Button>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                <li>
                  <Button className="w-full">
                    <Link href="/">Home</Link>
                  </Button>
                </li>
                <li>
                  <Button className="w-full">
                    <Link href="/">Blog</Link>
                  </Button>
                </li>
                <li>
                  <Button className="w-full">
                    <Link href="/">Facebook</Link>
                  </Button>
                </li>
                <li>
                  <Button className="w-full">
                    <Link href="/">Instagram</Link>
                  </Button>
                </li>
                <li>
                  <Button className="w-full">
                    <Link href="/">Twitter</Link>
                  </Button>
                </li>
                <li>
                  <Button className="w-full">
                    <Link href="/">LinkedIn</Link>
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
                  <p>110 Results</p>
                </div>
                <div>
                  <p>See All</p>
                </div>
              </div>
              {/* tutorial bottom */}
              <div className="grid grid-cols-4 gap-5">
                <div className="grid gap-5">
                  <Button className="w-full h-auto">Popular</Button>

                  <Button className="w-full h-auto">Latest</Button>
                </div>
                <div className="h-36 rounded-2xl p-5 bg-red-200">2</div>
                <div className="h-36 rounded-2xl p-5 bg-red-200">3</div>
                <div className="h-36 rounded-2xl p-5 bg-red-200">4</div>
              </div>
            </div>
          </main>
        </div>

        {/* Right bar */}
        <div className="">
          <aside className="dashboard-aside  gap-5 h-screen ">
            <div className="dashboard-card-bg rounded-2xl p-2">Top</div>
            <div className="dashboard-card-bg rounded-2xl p-2">Bottom</div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
