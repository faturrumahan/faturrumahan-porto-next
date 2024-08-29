import ProjectList from "@/components/molecules/Dashboard/ProjectList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";

const DashboardProjectPage = () => {
  return (
    <div className="p-10 flex flex-col gap-3">
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">All of your projects</h1>
        <Link href="/dashboard/project/add">
          <Button className="bg-blue-500 flex item-center gap-2">
            <FaPlus /> Add new project
          </Button>
        </Link>
      </div>
      <ProjectList />
    </div>
  );
};

export default DashboardProjectPage;
