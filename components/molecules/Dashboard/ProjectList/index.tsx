"use client";
import ProjectLists from "@/components/atoms/ProjectLists";
import useFetchProjects from "@/utils/hooks/useFetchProjects";
import React, { useEffect } from "react";
import { PulseLoader } from "react-spinners";

const ProjectList = () => {
  const {
    isLoading: loadProjects,
    error: errProjects,
    data: projects,
    refetch,
    isFetching,
  } = useFetchProjects({ path: "/projects", query: "projectList" });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loadProjects || isFetching)
    return (
      <div className="flex max-lg:justify-center">
        <PulseLoader />
      </div>
    );
  if (errProjects) return <p>Something just error...</p>;

  return (
    <>
      <ProjectLists
        loadProjects={loadProjects}
        errProjects={errProjects}
        projects={projects}
        access="admin"
      />
    </>
  );
};

export default ProjectList;
