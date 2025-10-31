export const TokenManager = {
  getToken() {
    return localStorage.getItem("token");
  },

  setToken(token) {
    if (token) {
      localStorage.setItem("token", token);
    }
  },

  removeToken() {
    localStorage.removeItem("token");
  },
};
