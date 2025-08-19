import { safeRequest } from "@daycan/api";
import { publicInstance } from "../instance";
import type { TLoginResponse } from "./types";

/**
 * 센터종사자 로그인 API
 * @author 소보길
 */
export const login = async (
  username: string,
  password: string
): Promise<TLoginResponse | null> => {
  return await safeRequest.post<TLoginResponse>(publicInstance, "/auth/login", {
    username,
    password,
    userType: "CENTER",
  });
};

/**
 * 토큰 재발급 API
 * @author 소보길
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
