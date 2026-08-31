import api from "./axios";

export const getCareerProfile = async () => {
  return await api.get("/career-profile");
};

export const createCareerProfile = async (profileData) => {
  return await api.post("/career-profile", profileData);
};

export const updateCareerProfile = async (data) => {
  return await api.patch("/career-profile", data);
};

export const getCareerProfileHistory = async () => {
  return await api.get("/career-profile/history");
};

export const activateCareerProfile = async (careerProfileId) => {
  return await api.patch(
    `/career-profile/${careerProfileId}/activate`
  );
};

export const deleteCareerProfile = async (careerProfileId) => {
  return await api.delete(
    `/career-profile/${careerProfileId}`
  );
};