// src/api/weeklyReviewApi.js

import api from "./axios";

export const getCurrentWeeklyReview = async () => {
  const response = await api.get("/weekly-review/current");
  return response.data;
};

export const getWeeklyReviewStats = async () => {
  const response = await api.get("/weekly-review/stats");
  return response.data;
};

export const getWeeklyReviewHistory = async (page = 1, limit = 10) => {
  const response = await api.get("/weekly-review/history", {
    params: { page, limit },
  });

  return response.data;
};

export const getWeeklyReviewById = async (reviewId) => {
  const response = await api.get(`/weekly-review/${reviewId}`);
  return response.data;
};

export const analyzeCurrentWeeklyReview = async () => {
  const response = await api.post("/weekly-review/current/analyze");
  return response.data;
};