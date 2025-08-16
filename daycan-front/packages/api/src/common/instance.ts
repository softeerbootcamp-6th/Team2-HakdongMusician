// NODE_ENV가 'development'일 때 로깅 활성화 - pnpm dev 명령어 실행 시 활성화
export const __DEV__ = process.env.NODE_ENV === "development";

// 환경 확인 로깅 (한 번만 실행)
console.log("🔧 Environment Check:", {
  NODE_ENV: process.env.NODE_ENV,
  __DEV__: __DEV__,
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
});
