import { safeRequest } from "@daycan/api";
import type { TLoginResponse } from "./types";
import { publicInstance } from "../instance";
import { handleError } from "@/services/error/handleError";

/**
 * 유저 로그인 API
 * @author 홍규진
 */
export const login = async (
  username: string,
  password: string
): Promise<TLoginResponse | null> => {
  try {
    const response = await safeRequest.post<TLoginResponse>(
      publicInstance,
      "/auth/login",
      {
        username,
        password,
        userType: "MEMBER",
      }
    );
    return response;
  } catch (error) {
    handleError(error, "mobile");
    return Promise.resolve(null);
  }
};

/**
 * 토큰 재발급 API
 * @author 홍규진
 */
export const reIssueToken = async (
  refreshToken: string
): Promise<TLoginResponse | null> => {
  try {
    const response = await safeRequest.post<TLoginResponse>(
      publicInstance,
      "/auth/reissue",
      {
        refreshToken,
      }
    );
    return response;
  } catch (error) {
    handleError(error, "mobile");
    return Promise.resolve(null);
  }
};
