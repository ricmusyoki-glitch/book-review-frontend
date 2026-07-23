import api from "../api/axios";

const register = async (userData) => {
  const response = await api.post("/accounts/register/", userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await api.post("/accounts/login/", credentials);

  if (response.data.access) {
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

const getProfile = async () => {
  const response = await api.get("/accounts/profile/");
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getProfile,
};

export default authService;