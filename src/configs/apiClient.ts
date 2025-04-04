import { useUserStore } from "@/store/useUser";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    "Access-Control-Allow-Credentials": true,
    credentials: "true",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const session = useUserStore.getState().user;
    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const removeAuth = useUserStore.getState().removeUser;
    if (error.status === 401) {
      removeAuth();
    }
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);
