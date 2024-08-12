"use client";
import ContentBody from "@/components/molecules/ContentBody";
import ContentHeader from "@/components/molecules/ContentHeader";
import React, { useState } from "react";

const ContentBar = () => {
  const [content, setContent] = useState("About")
  const onSelectContent = (selectedContent : string) => {
    setContent(selectedContent)
  }
  return (
    <div className="bg-stone-100 rounded-lg flex-1 shadow-md overflow-y-auto ">
      <ContentHeader selectedContent={onSelectContent}/>
      <div className="p-7">
        <ContentBody content={content}/>
      </div>
    </div>
  );
};

export default ContentBar;
