import { applyDevLoggingInterceptor } from "@daycan/api";
import axios from "axios";

export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

applyDevLoggingInterceptor(publicInstance);
applyDevLoggingInterceptor(privateInstance);
