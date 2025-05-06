import { api } from "./client";

export const userApi = {
  // 토큰 불필요
  login: (userData) => api.post(`/auth/login`, userData, false), // 로그인
  register: (userData) => api.post("/auth/register", userData, false), // 회원가입
  resetPassword: (userData) =>
    api.post("/auth/reset-password", userData, false), // 비밀번호 초기화
  //토큰 필요
  getUser: () => api.get("/auth/info", {}, true), // 마이페이지 조회
  updateUser: (userData) => api.put(`/auth/update`, userData, true), // 회원정보 수정(비밀번호 변경 포함)
  deleteUser: () => api.delete(`/auth/withdraw`, {}, true), // 회원 탈퇴
  logout: () => api.post("/auth/logout", {}, true), // 로그아웃
};
