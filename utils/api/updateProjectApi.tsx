import Cookies from "js-cookie";
import satellite from "@/services/satellite";

const updateProjectApi = async (projectData: FormData, id: number) => {
  const token = Cookies.get("authToken_faturrumahan");
  const response = await satellite.patch("/projects/" + id, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export default updateProjectApi;
