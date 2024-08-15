"use client";
import useFetchProjects from "@/utils/hooks/useFetchProjects";
import React, { useState } from "react";
import ProjectLists from "../../ProjectLists";

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

  return (
    <>
      <section id="works-header" className="flex gap-10">
        {loadCategory && <p>Loading...</p>}
        {errCategory && <p>Something just error...</p>}
        {category && (
          <>
            <h2
              className={`cursor-pointer hover:underline underline-offset-4 ${
                filter === "" && "underline"
              }`}
              onClick={() => filterHandler("")}
            >
              All
            </h2>
            {category.map((cat: any) => (
              <h2
                key={cat.id + cat.name}
                className={`cursor-pointer hover:underline underline-offset-4 ${
                  cat.id === filter && "underline"
                }`}
                onClick={() => filterHandler(cat.id)}
              >
                {cat.name}
              </h2>
            ))}
          </>
        )}
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
