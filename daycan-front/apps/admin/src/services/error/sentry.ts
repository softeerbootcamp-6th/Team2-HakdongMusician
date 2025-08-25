import * as Sentry from "@sentry/react";

export const initSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  const environment = import.meta.env.VITE_SENTRY_ENVIRONMENT || "development";
  const release = import.meta.env.VITE_SENTRY_RELEASE || "1.0.0";

  if (!dsn) {
    console.warn("Sentry DSN이 설정되지 않았습니다.");
    return;
  }

  Sentry.init({
    dsn,
    environment,
    release,

    // 성능 모니터링 설정
    tracesSampleRate: environment === "production" ? 0.1 : 1.0,

    // 에러 샘플링 설정
    replaysSessionSampleRate: environment === "production" ? 0.1 : 1.0,
    replaysOnErrorSampleRate: 1.0,

    // 브라우저 정보 수집
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],

    // 에러 필터링 (서버 에러와 ErrorFallback 에러는 전송)
    beforeSend(event, hint) {
      const error = hint.originalException;

      // ErrorFallback에서 발생한 클라이언트 에러는 전송
      if (event.tags?.errorType === "client_fatal_error") {
        return event;
      }

      // ServerError 인스턴스만 전송
      if (error && typeof error === "object" && "code" in error) {
        const errorCode = (error as any).code;

        // 서버 에러 (500번대)만 전송
        if (errorCode >= 50000 && errorCode < 60000) {
          return event;
        }
      }

      // 다른 에러는 전송하지 않음
      return null;
    },
  });

  console.log(`Sentry 초기화 완료: ${environment} 환경`);
};

export const captureServerError = (
  error: unknown,
  context?: Record<string, any>
) => {
  if (!import.meta.env.VITE_SENTRY_DSN) {
    return;
  }

  Sentry.captureException(error, {
    tags: {
      errorType: "server_error",
    },
    extra: context,
  });
};

export const setUserContext = (userId: string, userEmail?: string) => {
  Sentry.setUser({
    id: userId,
    email: userEmail,
  });
};

export const clearUserContext = () => {
  Sentry.setUser(null);
};
