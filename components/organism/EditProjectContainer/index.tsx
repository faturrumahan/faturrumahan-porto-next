"use client";
import ProjectForm from "@/components/molecules/Dashboard/ProjectForm";
import useFetchProjects from "@/utils/hooks/useFetchProjects";
import React, { useEffect } from "react";
import { PacmanLoader } from "react-spinners";

const EditProjectContainer = (id: any) => {
  const { isLoading, error, data, refetch, isFetching } = useFetchProjects({
    path: "/projects/" + id.id,
    query: "projectDetail",
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading || isFetching) {
    return <PacmanLoader size={10} />;
  }
  return <ProjectForm mode="edit" data={data.data} />;
};

export default EditProjectContainer;
