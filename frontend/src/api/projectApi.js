import api from "./axios";


export const getResumeProjects = async () => {
    const response = await api.get("/projects/resume");
    return response.data;
};
export const getCareerOSProjects = async () => {
    const response = await api.get("/projects/career");
    return response.data;
};

export const getResumeProjectById = async (projectId) => {
  const response = await api.get(`/projects/resume/${projectId}`);
  return response.data;
};