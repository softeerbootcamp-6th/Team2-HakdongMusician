import axios from "axios";
import { applyDevLoggingInterceptor } from "./interceptor";

// NODE_ENV가 'development'일 때 로깅 활성화 - pnpm dev 명령어 실행 시 활성화
export const __DEV__ = process.env.NODE_ENV === "development";

// 환경 확인 로깅 (한 번만 실행)
console.log("🔧 Environment Check:", {
  NODE_ENV: process.env.NODE_ENV,
  __DEV__: __DEV__,
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
});

// axios 인스턴스 생성(나중에 바꿀 겁니다~)
export const instance = axios.create({
  baseURL: "localhost:8080",
  timeout: 2000,
});

// 개발 환경에서만 로깅을 하는 인터셉터 적용
applyDevLoggingInterceptor(instance);
