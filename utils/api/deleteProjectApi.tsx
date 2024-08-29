import React from "react";
import Cookies from "js-cookie";
import satellite from "@/services/satellite";

const deleteProjectApi = async (projectId: number) => {
  const token = Cookies.get("authToken_faturrumahan");
  const response = await satellite.delete("/projects/" + projectId, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export default deleteProjectApi;
