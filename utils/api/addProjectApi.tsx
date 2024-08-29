import satellite from "@/services/satellite";
import Cookies from "js-cookie";

const addProjectApi = async (projectData: any) => {
  const token = Cookies.get("authToken_faturrumahan");
  const response = await satellite.post("/projects", projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export default addProjectApi;
