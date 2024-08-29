import ProjectForm from "@/components/molecules/Dashboard/ProjectForm";
import React from "react";

const AddProject = () => {
  return (
    <div className="p-10">
      <h1 className="font-bold text-xl">Add new project</h1>
      <ProjectForm />
    </div>
  );
};

export default AddProject;
