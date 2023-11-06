import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <section className="max-w-[1280px] mx-auto">
      <div className="dashboard-container  gap-5">
        {/* Left side bar */}
        <div className="dashboard-card-bg  ">
          <div className="flex flex-col justify-between h-screen  p-2 text-sm">
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

        <div className="dashboard-card-bg">Middle</div>
        {/* Right bar */}
        <div className="dashboard-card-bg">Right</div>
      </div>
    </section>
  );
};

export default DashboardPage;
