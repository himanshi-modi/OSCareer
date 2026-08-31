
import api from "./axios";

export const registerUser = async (userData) => {
  return await api.post("/auth/register", userData);
};

export const verifyEmail = async (token) => {
  return await api.get(
    `/auth/verify-email?token=${encodeURIComponent(token)}`
  );
};

export const loginUser = async (credentials) => {
  return await api.post("/auth/login", credentials);
};

export const forgotPassword = (data) =>
  api.post("/auth/forgot-password", data);

export const resetPassword = async (data) => {
  return await api.patch("/auth/reset-password", data);
};

export const changePassword = async (data) => {
  return await api.patch("/auth/change-password", data);
};

export const getCurrentUser = async () => {
  return await api.get("/auth/me");
};

export const updateProfile = async (data) => {
  return await api.patch("/auth/me", data);
};

export const deleteAccount = async (password) => {
  return await api.delete("/auth/me", {
    data: { password },
  });
};

export const resendVerificationEmail = async (email) => {
  return await api.post("/auth/resend-verification-email", {
    email,
  });
};

export const refreshToken = async () => {
  return await api.post("/auth/refresh-token");
};

export const logoutUser = async () => {
  return await api.post("/auth/logout");
};

export const logoutAll = async () => {
  return await api.post("/auth/logout-all");
};

