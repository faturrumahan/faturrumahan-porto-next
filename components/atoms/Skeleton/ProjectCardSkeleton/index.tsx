import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProjectCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="max-lg:p-2">
        <CardTitle className="truncate text-sm md:text-base">
          <Skeleton className="h-4 w-64" />
        </CardTitle>
        <CardDescription className="max-lg:hidden">
          <Skeleton className="h-4 w-48" />
        </CardDescription>
      </CardHeader>
      <CardContent className="max-lg:px-2 max-lg:pb-2">
        <Skeleton className="h-12 md:h-24 lg:h-40 w-full rounded" />
        <Skeleton className="h-4 w-80 mt-2" />
        <Skeleton className="h-4 w-64 mt-1" />
        <Skeleton className="h-4 w-72 mt-1" />
      </CardContent>
    </Card>
  );
};

export default ProjectCardSkeleton;
