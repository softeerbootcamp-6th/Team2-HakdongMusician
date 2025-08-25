import { Button, Heading, Body, Icon, COLORS } from "@daycan/ui";
import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import {
  errorFallbackContainer,
  errorFallbackCard,
  errorIllust,
  errorActions,
  pcDescriptionWrapper,
  mobileDescriptionWrapper,
  alertErrorIcon,
} from "./ErrorFallback.css";

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

export const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => {
  // ErrorFallback이 나타날 때 자동으로 Sentry에 에러 보고
  useEffect(() => {
    Sentry.captureException(error, {
      tags: {
        errorType: "client_fatal_error",
        component: "ErrorFallback",
      },
      extra: {
        errorMessage: error.message,
        errorStack: error.stack,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      },
    });
  }, [error]);

  const handleResetError = () => {
    // Sentry에 에러 복구 이벤트 전송
    Sentry.addBreadcrumb({
      category: "error",
      message: "User attempted to reset error",
      level: "info",
    });

    // 에러 상태 초기화
    resetError();
  };

  return (
    <div className={errorFallbackContainer}>
      <div className={errorFallbackCard}>
        {/* 에러 일러스트 */}
        <div className={errorIllust}>
          <Icon
            name="alertNotFound"
            width={200}
            height={200}
            className={alertErrorIcon}
          />
        </div>

        {/* 제목 */}
        <div className={pcDescriptionWrapper}>
          <Heading style={{ textAlign: "center" }}>
            오류가 발생했습니다 <br />
            예상치 못한 오류가 발생했습니다. 다시 시도해주세요.
          </Heading>

          <Body type="medium">
            아래 버튼을 이용하거나 페이지를 새로고침해주세요.
          </Body>
        </div>

        <div className={mobileDescriptionWrapper}>
          <Body
            type="large"
            weight={600}
            color={COLORS.gray[700]}
            style={{ textAlign: "center" }}
          >
            오류가 발생했습니다 <br />
            예상치 못한 오류가 발생했습니다. <br />
            다시 시도해주세요.
          </Body>
          <Body type="xsmall" weight={500} color={COLORS.gray[600]}>
            아래 버튼을 이용하거나 페이지를 새로고침해주세요.
          </Body>
        </div>

        {/* 개발 모드에서만 에러 상세 정보 표시 */}
        {import.meta.env.VITE_SENTRY_ENVIRONMENT === "development" && (
          <Body
            type="small"
            color={COLORS.red[500]}
            style={{
              marginTop: "16px",
              padding: "12px",
              backgroundColor: COLORS.red[200],
              borderRadius: "8px",
              fontFamily: "monospace",
              maxWidth: "100%",
              overflow: "auto",
            }}
          >
            {error.message}
            {error.stack && (
              <div style={{ marginTop: "8px", fontSize: "12px" }}>
                {error.stack}
              </div>
            )}
          </Body>
        )}

        {/* 액션 버튼들 */}
        <div className={errorActions}>
          <Button variant="primary" size="large" onClick={handleResetError}>
            다시 시도
          </Button>
        </div>
      </div>
    </div>
  );
};
