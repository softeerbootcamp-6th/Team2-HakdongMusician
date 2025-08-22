import { useMutation } from "@tanstack/react-query";
import { login, reIssueToken } from ".";
import type { TLoginResponse } from "./types";
import { useToast } from "@daycan/ui";

export const useLoginMutation = () => {
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
            variant: "mobile",
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
          variant: "mobile",
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

export const useLoginWithoutCheckMutation = () => {
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
            variant: "mobile",
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
          variant: "mobile",
        },
      });
    },
  });
};
