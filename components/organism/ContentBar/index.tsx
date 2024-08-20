"use client";
import ContentBody from "@/components/molecules/ContentBody";
import ContentHeader from "@/components/molecules/ContentHeader";
import React, { useEffect, useState } from "react";

const ContentBar = () => {
  const [content, setContent] = useState("About");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedContent = sessionStorage.getItem("selectedMenu");
      if (savedContent) {
        setContent(JSON.parse(savedContent).name);
      }
    }
  }, []);

  const onSelectContent = (selectedContent: string) => {
    setContent(selectedContent);
  };
  return (
    <div className="bg-stone-100 rounded-lg lg:flex-1 shadow-md overflow-y-auto max-lg:min-w-full">
      <ContentHeader selectedContent={onSelectContent} />
      <div className="p-5 lg:px-7 lg:py-10">
        <ContentBody content={content} />
      </div>
    </div>
  );
};

export default ContentBar;
