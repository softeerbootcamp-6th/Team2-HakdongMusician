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
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});
