import {
  NetworkError,
  ClientError,
  AuthError,
  HttpError,
  ServerError,
} from "@daycan/api";
import { useToast } from "@daycan/ui";
import { captureServerError } from "./sentry";

export const handleError = (
  error: unknown,
  device: "pc" | "mobile" = "pc",
  onAuthError?: () => void
) => {
  const { showToast } = useToast();
  const SHORT_TOAST_DURATION = 1000;

  // 에러 타입별로 다른 처리
  if (error instanceof NetworkError) {
    // 네트워크 에러 (DNS, CORS, 연결 실패 등)
    showToast({
      data: {
        message: `네트워크 오류: ${error.message}`,
        type: "error",
        variant: device,
      },
      autoClose: SHORT_TOAST_DURATION,
      hideProgressBar: true,
    });

    // 네트워크 상태 체크 로직 추가 가능
    console.error("🌐 Network Error:", error);
  } else if (error instanceof AuthError) {
    // 401/403 에러인 경우 로그인 페이지로 이동
    if (
      (error.code >= 40100 && error.code < 40200) ||
      (error.code >= 40300 && error.code < 40400)
    ) {
      onAuthError?.();
    }
  } else if (error instanceof ClientError) {
    // 클라이언트 에러 (400, 404 등)
    showToast({
      data: {
        message: `요청 오류: ${error.message}`,
        type: "warning",
        variant: device,
      },
      autoClose: SHORT_TOAST_DURATION,
      hideProgressBar: true,
    });

    // 사용자 입력 검증 또는 요청 재시도 로직
    console.error("📱 Client Error:", error);
  } else if (error instanceof ServerError) {
    // 서버 에러 (500, 502 등)
    showToast({
      data: {
        message: `서버 오류: ${error.message}`,
        type: "error",
        variant: "pc",
      },
      autoClose: SHORT_TOAST_DURATION,
      hideProgressBar: true,
    });

    // 서버 상태 모니터링 또는 재시도 로직
    console.error("🖥️ Server Error:", error);

    // Sentry로 서버 에러만 전송
    captureServerError(error, {
      errorCode: error.code,
      errorMessage: error.message,
      device,
      timestamp: new Date().toISOString(),
    });
  } else if (error instanceof HttpError) {
    // 기타 HTTP 에러 (300, 200 등)
    showToast({
      data: {
        message: `HTTP 오류: ${error.message}`,
        type: "warning",
        variant: device,
      },
      autoClose: SHORT_TOAST_DURATION,
      hideProgressBar: true,
    });

    console.error("🌍 HTTP Error:", error);
  } else {
    // 알 수 없는 에러
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다";

    showToast({
      data: {
        message: errorMessage,
        type: "error",
        variant: device,
      },
      autoClose: SHORT_TOAST_DURATION,
      hideProgressBar: true,
    });

    console.error("❓ Unknown Error:", error);
  }
};
