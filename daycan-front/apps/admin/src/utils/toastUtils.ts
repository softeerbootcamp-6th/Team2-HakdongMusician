/**
 * 토스트 메시지 관련 유틸리티 함수들을 모아둔 파일입니다.
 * @author 홍규진
 */
import { useToast } from "@daycan/ui";

// Hook을 사용할 수 없는 곳에서 토스트를 사용하기 위한 서비스
let toastInstance: ReturnType<typeof useToast>["showToast"] | null = null;

export const initToastService = (
  showToast: ReturnType<typeof useToast>["showToast"]
) => {
  toastInstance = showToast;
};

export const showToast = (options: {
  message: string;
  type: "success" | "error" | "warning" | "info";
  variant?: "pc" | "mobile";
}) => {
  if (toastInstance) {
    toastInstance({
      data: {
        message: options.message,
        type: options.type,
        variant: options.variant || "pc",
      },
      autoClose: options.type === "error" ? 5000 : 3000,
      hideProgressBar: true,
    });
  } else {
    console.warn("Toast service not initialized");
  }
};
