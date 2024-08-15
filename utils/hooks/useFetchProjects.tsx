import satellite from "@/services/satellite";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useFetchProjects({
  path,
  query,
}: {
  path: string;
  query: string;
}) {
  return useQuery({
    queryKey: [query],
    queryFn: () => satellite.get(path).then((response) => response.data),
    retry: 10,
  });
}
