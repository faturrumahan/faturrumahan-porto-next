import dynamic from "next/dynamic";
import React from "react";

const About = dynamic(() => import("@/components/atoms/ContentItems/About"));
const Resume = dynamic(() => import("@/components/atoms/ContentItems/Resume"));
const Works = dynamic(() => import("@/components/atoms/ContentItems/Works"));
const Contact = dynamic(
  () => import("@/components/atoms/ContentItems/Contact")
);

const ContentBody: React.FC<{ content: string }> = ({ content }) => {
  const renderContent = (contentName: string) => {
    switch (contentName) {
      case "About":
        return <About />;
      case "Resume":
        return <Resume />;
      case "Works":
        return <Works />;
      case "Contact":
        return <Contact />;
    }
  };
  return renderContent(content);
};

export default ContentBody;
