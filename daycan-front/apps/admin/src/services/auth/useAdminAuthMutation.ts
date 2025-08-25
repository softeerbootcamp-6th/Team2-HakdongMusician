import { useMutation } from "@tanstack/react-query";
import { login, reAuth, reIssueToken } from ".";
import type { TLoginResponse, TReAuthResponse } from "./types";
import { useToast } from "@daycan/ui";

export const useAdminLoginMutation = () => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => login(username, password),
    onSuccess: (data: TLoginResponse | null) => {
      if (!data) {
        showToast({
          data: {
            message: "로그인 실패",
            type: "error",
            variant: "pc",
          },
        });
        return;
      }
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      sessionStorage.removeItem("refreshToken");
      showToast({
        data: {
          message: "로그인 성공",
          type: "success",
          variant: "pc",
        },
      });
    },
  });
};

export const useReIssueTokenMutation = () => {
  return useMutation({
    mutationFn: ({ refreshToken }: { refreshToken: string }) =>
      reIssueToken(refreshToken),
    onSuccess: (data: TLoginResponse | null) => {
      if (!data) return;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    },
  });
};

/**
 * 인증 모달 확인 뮤테이션
 * @author 소보길
 */
export const useReAuthMutation = () => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: (password: string) => reAuth(password),
    onSuccess: (data: TReAuthResponse | null) => {
      if (!data) return;
      showToast({
        data: {
          message: "인증이 완료되었습니다.",
          type: "success",
          variant: "pc",
        },
      });
    },
  });
};

export const useAdminLoginWithoutCheckMutation = () => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => login(username, password),
    onSuccess: (data: TLoginResponse | null) => {
      if (!data) {
        showToast({
          data: {
            message: "로그인 실패",
            type: "error",
            variant: "pc",
          },
        });
        return;
      }
      localStorage.setItem("accessToken", data.accessToken);
      sessionStorage.setItem("refreshToken", data.refreshToken);
      localStorage.removeItem("refreshToken");
      showToast({
        data: {
          message: "로그인 성공",
          type: "success",
          variant: "pc",
        },
      });
    },
  });
};
