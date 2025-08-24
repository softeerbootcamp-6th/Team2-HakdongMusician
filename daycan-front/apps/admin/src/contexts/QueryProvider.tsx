import {
  QueryClient,
  QueryClientProvider as _QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { type ReactNode } from "react";
import { AuthError, ClientError } from "@daycan/api";
import { showToast } from "@/utils/toastUtils";
import { handleError } from "@/services/error";
import { useNavigate } from "react-router-dom";
import { reIssueToken } from "@/services/auth";

/**
 * 이미 QueryClient는 Context API를 통해 구현되어있기에
 * 따로 Context API를 통해 관리하지 않습니다.
 * 에러 처리는 모두 통일성 있게 handleError 함수를 통해 처리합니다.
 * packages/api 에서 정의한 customError 타입을 사용합니다.
 * 각 에러 타입별로 다른 토스트 메시지를 표시할 수 있도록 설정합니다.
 * N개의 API 호출에서 N개의 try catch 문을 작성하는 것보다 훨씬 깔끔합니다.
 * @author 홍규진
 */
export function QueryClientProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const handleAuthError = () => {
    let refreshToken = localStorage.getItem("refreshToken");
    let inSessionStorage = false;

    if (!refreshToken) {
      refreshToken = sessionStorage.getItem("refreshToken");
      inSessionStorage = true;
    }

    if (!refreshToken) {
      navigate("/login");
    } else {
      reIssueToken(refreshToken)
        .then((data) => {
          if (!data) return;
          localStorage.setItem("accessToken", data.accessToken);

          if (inSessionStorage) {
            sessionStorage.setItem("refreshToken", data.refreshToken);
            localStorage.removeItem("refreshToken");
          } else {
            localStorage.setItem("refreshToken", data.refreshToken);
            sessionStorage.removeItem("refreshToken");
          }
          window.location.reload();
        })
        .catch(() => {
          showToast({
            message: "로그인 정보가 만료되었습니다. 다시 로그인해주세요.",
            type: "error",
            variant: "pc",
          });
          // 비동기 처리로 각 onError 메시지 보여주고 로그인 페이지로 이동
          setTimeout(() => {
            navigate("/login");
          }, 100);
        });
    }
  };
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // 실패 재시도 정책 (네트워크/서버 에러만 재시도)
        retry(failureCount, error: unknown) {
          if (error instanceof AuthError || error instanceof ClientError) {
            return false; // 401/403/4xx는 재시도 안함
          }
          return failureCount < 2; // 네트워크/서버 에러는 2번까지 재시도
        },
        staleTime: 1000 * 60, // 1분
        gcTime: 1000 * 60 * 5, // 5분
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false, // 뮤테이션은 기본적으로 재시도 안함
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        handleError(error, "pc", handleAuthError);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _ctx, mutation) => {
        // 조용한 에러 처리 설정이 있으면 스킵
        if (mutation.meta?.silentError) return;
        handleError(error, "pc", handleAuthError);
      },
      onSuccess: (_data, _variables, _ctx, mutation) => {
        // 성공 메시지가 설정되어 있으면 표시
        if (mutation.meta?.successMessage) {
          showToast({
            message: String(mutation.meta.successMessage),
            type: "success",
          });
        }
      },
    }),
  });

  return (
    <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>
  );
}
