import api from "./axios";

export const getActiveRoadmap = async () => {
  const response = await api.get("/roadmaps");

  return response.data;
};

export const getRoadmapDetails = async (roadmapId) => {
  const response = await api.get(`/roadmaps/${roadmapId}`);
  return response.data;
};

export const regenerateRoadmap = async (roadmapId, reason) => {
  const response = await api.post(`/roadmaps/${roadmapId}/regenerate`,
    {
      reason,
    }
  );
  return response.data;
};