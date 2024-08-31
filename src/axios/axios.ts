import axios from "axios";
import { error } from "console";

const instance = axios.create({
  // baseURL: "http://localhost:8081",
  baseURL: "10.4.56.59:8081",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export default instance;
instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// instance.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${window.localStorage.getItem(
//     "token"
//   )}`;
//   return config;
// });

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401) {
      try {
        const response = await instance.get("/api/auth/refresh", {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return instance.request(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
  }
);
