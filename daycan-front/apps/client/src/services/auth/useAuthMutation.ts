import { useMutation } from "@tanstack/react-query";
import { login, reIssueToken } from ".";
import type { TLoginResponse } from "./types";
import { useToast } from "@daycan/ui";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => login(username, password),
    onSuccess: (data: TLoginResponse | null) => {
      if (!data) return;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      showToast({
        data: {
          message: "로그인 성공",
          type: "success",
          variant: "mobile",
        },
      });
      navigate("/");
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
