import { api } from "./client";

export const mainApi = {
  getCctvs: () => api.get("/cctv", {}, true),
  createCctv: (cctvData) => api.post(`/cctv/add`, cctvData, true),
  updateCctv: (id, cctvData) => api.put(`/cctv/update/${id}`, cctvData, true),
  deleteCctv: (ids) => api.delete(`/cctv/delete`, ids, true),
  startStreaming: (id) => api.get(`/streaming/start/${id}`, {}, true),
  stopStreaming: (id) => api.get(`/streaming/stop/${id}`, {}, true),
};
