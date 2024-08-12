"use client";
import useFetchProjects from "@/utils/hooks/useFetchProjects";
import React from "react";

const Works = () => {
  const { isLoading, error, data } = useFetchProjects({ path: "/projects" });
  console.log(data);
  return <div>Work</div>;
};

export default Works;
