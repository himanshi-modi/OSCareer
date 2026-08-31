import api from "./axios";

export const getNotifications = (params = {}) =>
  api.get("/notifications", { params });

export const getUnreadNotificationCount = () =>
  api.get("/notifications/unread-count");

export const getNotificationDetails = (notificationId) =>
  api.get(`/notifications/${notificationId}`);

export const markNotificationAsRead = (notificationId) =>
  api.patch(`/notifications/${notificationId}/read`);

export const markAllNotificationsAsRead = () =>
  api.patch("/notifications/read-all");

export const deleteNotification = (notificationId) =>
  api.delete(`/notifications/${notificationId}`);

export const clearAllNotifications = () =>
  api.delete("/notifications");