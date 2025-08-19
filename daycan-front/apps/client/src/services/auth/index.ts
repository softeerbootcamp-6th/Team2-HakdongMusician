import { safeRequest } from "@daycan/api";
import type { TLoginResponse } from "./types";
import { publicInstance } from "../instance";

/**
 * 유저 로그인 API
 * @author 홍규진
 */
export const login = async (
  username: string,
  password: string
): Promise<TLoginResponse | null> => {
  return await safeRequest.post<TLoginResponse>(publicInstance, "/auth/login", {
    username,
    password,
    userType: "MEMBER",
  });
};

/**
 * 토큰 재발급 API
 * @author 홍규진
 */
export const reIssueToken = async (
  refreshToken: string
): Promise<TLoginResponse | null> => {
  return await safeRequest.post<TLoginResponse>(
    publicInstance,
    "/auth/reissue",
    {
      refreshToken,
    }
  );
};
