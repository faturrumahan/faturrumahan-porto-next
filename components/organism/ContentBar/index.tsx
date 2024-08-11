"use client";
import ContentHeader from "@/components/molecules/ContentHeader";
import useFetchProjects from "@/utils/hooks/useFetchProjects";
import React from "react";

const ContentBar = () => {
  const path = "/projects";
  const { isLoading, error, data } = useFetchProjects({ path });
  return (
    <div className="bg-stone-100 rounded-lg flex-1 shadow-md overflow-y-auto ">
      <ContentHeader />
    </div>
  );
};

export default ContentBar;
