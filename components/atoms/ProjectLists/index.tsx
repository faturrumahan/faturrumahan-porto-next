import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProjectLists = ({
  filter,
  loadProjects,
  errProjects,
  projects,
}: {
  filter: string;
  loadProjects: any;
  errProjects: any;
  projects: any;
}) => {
  const [filteredProjects, setFilteredProjects] = useState([]);

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
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
      {filteredProjects.map((project: any) => {
        const image = project.image_path.split(",");
        const tag = project.tag.split(",");
        return (
          <Link
            key={project.id}
            className="hover: cursor-pointer"
            href={`/work/${project.id}`}
          >
            <Card>
              <CardHeader>
                <CardTitle className="truncate max-lg:text-sm">
                  {project.title}
                </CardTitle>
                <CardDescription className="max-lg:hidden">
                  {project.tag}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={
                    image
                      ? image[0]
                      : `https://placehold.co/1000x600?text=project+not+available+yet`
                  } //imgur
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-12 lg:h-40 w-full rounded object-cover"
                  alt={project.title}
                ></Image>
                <p className="line-clamp-3 mt-2 max-md:hidden">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectLists;
