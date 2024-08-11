import satellite from "@/services/satellite";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useFetchProjects({ path }: { path: string }) {
  return useQuery({
    queryKey: ["ProjectList"],
    queryFn: () => satellite.get(path).then((response) => response.data),
  });
}
