"use client";
import useFetchProjects from "@/utils/hooks/useFetchProjects";
import React, { useState } from "react";
import ProjectLists from "../../ProjectLists";
import { PulseLoader } from "react-spinners";
import { ICategory } from "@/interfaces";

const Works = () => {
  const {
    isLoading: loadCategory,
    error: errCategory,
    data: category,
  } = useFetchProjects({ path: "/categories", query: "categoryList" });

  const {
    isLoading: loadProjects,
    error: errProjects,
    data: projects,
  } = useFetchProjects({ path: "/projects", query: "projectList" });

  const [filter, setFilter] = useState("");

  const filterHandler = (menu: string) => {
    setFilter(menu);
  };

  if (loadCategory || loadProjects)
    return (
      <div className="flex max-lg:justify-center">
        <PulseLoader />
      </div>
    );
  if (errCategory || errProjects) return <p>Something just error...</p>;

  return (
    <>
      <section
        id="works-header"
        className="flex md:gap-10 justify-between md:justify-center lg:justify-start"
      >
        <h2
          className={`cursor-pointer hover:underline underline-offset-4 ${
            filter === "" && "underline"
          }`}
          onClick={() => filterHandler("")}
        >
          All
        </h2>
        {category.map((cat: ICategory) => (
          <h2
            key={cat.id + cat.name}
            className={`cursor-pointer hover:underline underline-offset-4 ${
              (cat.id as unknown as string) === filter && "underline"
            }`}
            onClick={() => filterHandler(cat.id as unknown as string)}
          >
            {cat.name}
          </h2>
        ))}
      </section>
      <section id="works-list" className="mt-5">
        <ProjectLists
          filter={filter}
          loadProjects={loadProjects}
          errProjects={errProjects}
          projects={projects}
        />
      </section>
    </>
  );
};

export default Works;
