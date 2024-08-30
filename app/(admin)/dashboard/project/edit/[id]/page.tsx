import ProjectForm from "@/components/molecules/Dashboard/ProjectForm";
import EditProjectContainer from "@/components/organism/EditProjectContainer";
import React from "react";

const EditProject = ({ params }: { params: any }) => {
  const { id } = params;
  return (
    <div className="p-10">
      <h1 className="font-bold text-xl">Edit project</h1>
      <EditProjectContainer id={id} />
    </div>
  );
};

export default EditProject;
