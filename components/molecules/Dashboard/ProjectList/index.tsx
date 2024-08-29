"use client";
import ProjectLists from "@/components/atoms/ProjectLists";
import useFetchProjects from "@/utils/hooks/useFetchProjects";
import React from "react";
import { PulseLoader } from "react-spinners";

const ProjectList = () => {
  const {
    isLoading: loadProjects,
    error: errProjects,
    data: projects,
  } = useFetchProjects({ path: "/projects", query: "projectList" });

  if (loadProjects)
    return (
      <div className="flex max-lg:justify-center">
        <PulseLoader />
      </div>
    );
  if (errProjects) return <p>Something just error...</p>;

  return (
    <ProjectLists
      loadProjects={loadProjects}
      errProjects={errProjects}
      projects={projects}
      access="admin"
    />
  );
};

export default ProjectList;
