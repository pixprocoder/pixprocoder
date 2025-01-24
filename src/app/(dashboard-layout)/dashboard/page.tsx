"use client";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import SingleCourseCardPage from "./card/singleCard";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/src/providers/AuthProviders";
import { useRouter } from "next/navigation";
import LoadingPage from "../loading";
import Sidebar from "./_components/Sidebar";
import MainContent from "./_components/MainContent";

const DashboardPage = () => {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  user?.email ? router.push("/dashboard") : router.push("/login");

  return (
    <section>
      <div className="">
        {/* Main Content */}
        <MainContent />
      </div>
    </section>
  );
};

export default DashboardPage;
