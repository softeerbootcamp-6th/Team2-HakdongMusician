// import { applyDevLoggingInterceptor } from "@daycan/api";
import axios from "axios";

export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 리프레시 토큰이 있을때만 accessToken 헤더에 추가
privateInstance.interceptors.request.use((config) => {
  const RefreshToken =
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken");
  if (RefreshToken) {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
// applyDevLoggingInterceptor(publicInstance);
// applyDevLoggingInterceptor(privateInstance);
