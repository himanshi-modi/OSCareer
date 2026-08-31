import api from "./axios";

export const getCurrentStageChallenge = async () => {
  const response = await api.get("/stage-challenge/current");

  return response.data;
};

export const startCurrentStageChallenge = async () => {
  const response = await api.post("/stage-challenge/start");

  return response.data;
};

export const submitCurrentStageChallenge = async (data) => {
  const response = await api.post(
    "/stage-challenge/submit",
    data
  );

  return response.data;
};

export const evaluateCurrentStageChallenge = async () => {
  const response = await api.post(
    "/stage-challenge/evaluate"
  );

  return response.data;
};