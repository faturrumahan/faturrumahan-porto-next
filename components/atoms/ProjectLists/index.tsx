import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import deleteProjectApi from "@/utils/api/deleteProjectApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const ProjectLists = ({
  filter,
  loadProjects,
  errProjects,
  projects,
  access,
}: {
  filter?: string;
  loadProjects: any;
  errProjects: any;
  projects: any;
  access?: string;
}) => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const deleteProjectHandler = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await deleteProjectApi(id);
      if (response) {
        location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (projects) {
      if (filter) {
        // Filter projects by the selected category ID
        const filtered = projects.data.filter(
          (project: { category: string }) => project.category === filter
        );
        setFilteredProjects(filtered);
      } else {
        // Show all projects if no filter is selected
        setFilteredProjects(projects.data);
      }
    }
  }, [projects, filter]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-white rounded-full"></div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        {filteredProjects.map((project: any) => {
          const image = project.image_path.split(",");
          return (
            <div key={project.id}>
              <Link
                className="hover: cursor-pointer"
                href={`/work/${project.id}`}
              >
                <Card>
                  <CardHeader className="max-lg:p-2">
                    <CardTitle className="truncate text-sm md:text-base">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="max-lg:hidden">
                      {project.tag}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="max-lg:px-2 max-lg:pb-2">
                    <Image
                      src={
                        image
                          ? image[0]
                          : `https://placehold.co/1000x600?text=project+not+available+yet`
                      } //imgur
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-12 md:h-24 lg:h-40 w-full rounded object-cover"
                      alt={project.title}
                    ></Image>
                    <p className="line-clamp-3 mt-2 max-md:hidden">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
              {access === "admin" && (
                <div className="mt-2 flex flex-wrap justify-between gap-2">
                  <Button className="bg-green-500 flex-1" asChild>
                    <Link
                      href={"/dashboard/project/edit/" + project.id}
                      className="flex gap-1.5 items-center"
                    >
                      <FaRegEdit />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    className="bg-red-500 flex-1 gap-1.5 items-center"
                    onClick={() => deleteProjectHandler(project.id)}
                  >
                    <FaRegTrashAlt />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProjectLists;
