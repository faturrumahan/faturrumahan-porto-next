import ContentHeader from "@/components/molecules/ContentHeader";
import React from "react";

const ContentBar = () => {
  return (
    <div className="bg-stone-100 rounded-lg flex-1 shadow-md overflow-y-auto ">
      <ContentHeader />
    </div>
  );
};

export default ContentBar;
