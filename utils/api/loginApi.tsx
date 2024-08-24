import { LoginCredentials, LoginResponse } from "@/interfaces";
import satellite from "@/services/satellite";
import React from "react";

const loginApi = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await satellite.post<LoginResponse>(
    "/auth/login",
    credentials
  );
  return response.data;
};

export default loginApi;
