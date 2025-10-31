import { api } from "./client";

export const userApi = {
  // 토큰 불필요
  login: (userData) => api.post(`/auth/login`, userData, false),
  register: (userData) => api.post("/auth/register", userData, false),
  resetPassword: (userData) =>
    api.post("/auth/reset-password", userData, false),
  //토큰 필요
  getUser: () => api.get("/auth/info", {}, true),
  updateUser: (userData) => api.put(`/auth/update`, userData, true),
  deleteUser: (userId) => api.delete(`/auth/withdraw/${userId}`, true),
  logout: (userData) => api.post("/auth/logout", userData, true),
  updateNotification: (userData) =>
    api.put("/user/notification", userData, true),
};
