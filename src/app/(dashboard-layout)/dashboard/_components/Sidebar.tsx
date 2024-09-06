import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import React from "react";

function Sidebar() {
  return (
    <div className="bg-gray-500 min-h-screen px-2 space-y-2">
      <Button className="w-full ">All User</Button>
      <Button className="w-full " asChild>
        <Link href="/dashboard/write-blog">Add Blog</Link>
      </Button>
    </div>
  );
}

export default Sidebar;
