import Sidebar from "@/components/shared/sideBar";
import React, { ReactNode } from "react";

function DashboardPage({ children }: { children: ReactNode }) {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  );
}

export default DashboardPage;
