import { api } from "./client";

export const cctvApi = {
  getCctvs: () => api.get("/cctv", {}, true),
  createCctv: (cctvData) => api.post(`/cctv/add`, cctvData, true),
  updateCctv: (id, cctvData) => api.put(`/cctv/update/${id}`, cctvData, true),
  deleteCctv: (ids) => api.delete(`/cctv/delete`, ids, true),
};
