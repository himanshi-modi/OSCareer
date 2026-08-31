import api from "./axios";

export const getDashboard = () => {
  return api.get("/dashboard");
};

export const getDashboardStats = () => {
  return api.get("/dashboard/stats");
};

export const getDashboardProgress = () => {
  return api.get("/dashboard/progress");
};

export const getCareerInsights = () => {
  return api.get("/dashboard/insights");
};