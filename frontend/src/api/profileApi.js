
import api from "./axios";

export const getProfileOverview = async () => {
  const response = await api.get("/dashboard/profile");

  return response.data;
};
