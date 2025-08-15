import {
  NetworkError,
  ClientError,
  AuthError,
  HttpError,
  ServerError,
} from "@daycan/api";
import { useToast } from "@daycan/ui";
import { useNavigate } from "react-router-dom";

export const handleError = (error: unknown, device: "pc" | "mobile" = "pc") => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // 에러 타입별로 다른 처리
  if (error instanceof NetworkError) {
    // 네트워크 에러 (DNS, CORS, 연결 실패 등)
    showToast({
      data: {
        message: `네트워크 오류: ${error.message}`,
        type: "error",
        variant: device,
      },
      autoClose: 3000,
      hideProgressBar: true,
    });

    // 네트워크 상태 체크 로직 추가 가능
    console.error("🌐 Network Error:", error);
  } else if (error instanceof AuthError) {
    // 인증/인가 에러 (401, 403 등)
    showToast({
      data: {
        message: `권한 오류: ${error.message}`,
        type: "error",
        variant: device,
      },
      autoClose: 4000,
      hideProgressBar: true,
    });

    // 로그인 페이지로 리다이렉트 또는 권한 체크
    console.error("🔐 Auth Error:", error);

    // 401/403 에러인 경우 로그인 페이지로 이동
    // 추후에 더 확정되면, reissue 토큰 요청으로 변경 필요
    if (
      (error.code >= 40100 && error.code < 40200) ||
      (error.code >= 40300 && error.code < 40400)
    ) {
      navigate("/login");
    }
  } else if (error instanceof ClientError) {
    // 클라이언트 에러 (400, 404 등)
    showToast({
      data: {
        message: `요청 오류: ${error.message}`,
        type: "warning",
        variant: device,
      },
      autoClose: 3000,
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
      autoClose: 5000,
      hideProgressBar: true,
    });

    // 서버 상태 모니터링 또는 재시도 로직
    console.error("🖥️ Server Error:", error);

    // Sentry 등으로 에러 로깅
    // captureException(error);
  } else if (error instanceof HttpError) {
    // 기타 HTTP 에러 (300, 200 등)
    showToast({
      data: {
        message: `HTTP 오류: ${error.message}`,
        type: "warning",
        variant: device,
      },
      autoClose: 3000,
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
      autoClose: 4000,
      hideProgressBar: true,
    });

    console.error("❓ Unknown Error:", error);
  }
};

// 특정 에러 타입별 전용 처리 함수들
export const handleNetworkError = (error: NetworkError) => {
  console.error("🌐 Network Error Details:", {
    message: error.message,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  });

  // 네트워크 상태 체크
  if (!navigator.onLine) {
    console.log("오프라인 상태입니다");
  }
};

export const handleAuthError = (error: AuthError) => {
  console.error("🔐 Auth Error Details:", {
    code: error.code,
    message: error.message,
    timestamp: new Date().toISOString(),
  });

  // 인증 토큰 만료 체크
  if (
    (error.code >= 40100 && error.code < 40200) ||
    (error.code >= 40300 && error.code < 40400)
  ) {
    // 토큰 갱신 또는 로그아웃 처리
    console.log("인증 토큰이 만료되었습니다");
    window.location.href = "/login";
  }
};

export const handleServerError = (error: ServerError) => {
  console.error("🖥️ Server Error Details:", {
    code: error.code,
    message: error.message,
    timestamp: new Date().toISOString(),
  });

  // 서버 상태 체크 또는 재시도 로직
  if (error.code >= 50000) {
    console.log("서버 내부 오류가 발생했습니다");
  }
};
