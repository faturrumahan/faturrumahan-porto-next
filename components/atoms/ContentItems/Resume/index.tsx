import React from "react";
import ExperienceLists from "../../ExperienceLists";
import SkillLists from "../../SkillLists";

const Resume = () => {
  return (
    <div className="flex flex-col gap-3">
      <ExperienceLists />
      <SkillLists />
    </div>
  );
};

export default Resume;
