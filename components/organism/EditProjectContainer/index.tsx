"use client";
import ProjectForm from "@/components/molecules/Dashboard/ProjectForm";
import useFetchProjects from "@/utils/hooks/useFetchProjects";
import React from "react";

const EditProjectContainer = (id: any) => {
  const { isLoading, error, data } = useFetchProjects({
    path: "/projects/" + id.id,
    query: "projectDetail" + id.id,
  });

  if (isLoading) {
    return <div>loading</div>;
  }
  return <ProjectForm mode="edit" data={data.data} />;
};

export default EditProjectContainer;
