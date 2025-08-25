import { safeRequest } from "@daycan/api";
import { privateInstance, publicInstance } from "../instance";
import type { TLoginResponse, TReAuthResponse } from "./types";

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

/*
 * 수정 삭제 인증 모달 확인
 * @author 소보길
 */
export const reAuth = async (
  password: string
): Promise<TReAuthResponse | null> => {
  return await safeRequest.post<TReAuthResponse>(
    privateInstance,
    "/admin/center/verify-password",
    {
      password,
    }
  );
};
