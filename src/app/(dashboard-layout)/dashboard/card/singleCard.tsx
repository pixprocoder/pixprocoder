import { Button } from "@/src/components/ui/button";
import React from "react";

const SingleCourseCardPage = () => {
  return (
    <div className="dashboard-card-bg rounded-xl p-6">
      <div>
        <div className="flex  items-center justify-between  gap-2">
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full bg-red-200"></div>
            <div className="flex flex-col">
              <h1 className="font-bold ">Micheal Levin</h1>
              <p className="text-sm">3d Artist</p>
            </div>
          </div>
          <div className="flex gap-1 justify-center items-center">
            <h1 className="font-bold">$25</h1>
            <p>per/hr</p>
          </div>
        </div>
      </div>
      {/* /// */}
      <div className="mt-5">
        <div className="flex  items-end justify-between  gap-2">
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <h1>🕛 Online Teacher</h1>
              <p>⭐ 4.2(760 ratings)</p>
            </div>
          </div>

          <div className="">
            <Button> Details</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseCardPage;
