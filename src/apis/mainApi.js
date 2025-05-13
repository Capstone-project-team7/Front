import { api } from "./client";

export const mainApi = {
  getVideoList: (filter) => api.post("/video/list", filter, true),
  downloadVideo: (ids) => api.post("/video/download", ids, true),
  deleteVideo: (ids) => api.delete("/video/delete", ids, true),
  viewVideo: (id) => api.get(`video/view/${id}`, {}, true),
  loadCalendar: (date) => api.get(`/calendar${date}`, {}, true),
};
