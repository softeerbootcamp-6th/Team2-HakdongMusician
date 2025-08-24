import axios from "axios";

/**
 * 로그인 시 사용하는 인스턴스
 * @author 홍규진
 */
export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/**
 * 로그인 후 사용하는 인스턴스 (토큰 포함)
 * @author 홍규진
 */
export const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 리프레시 토큰이 있을때만 accessToken 헤더에 추가
// 권한 에러 방지
privateInstance.interceptors.request.use((config) => {
  const refreshToken =
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken");

  if (refreshToken) {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
