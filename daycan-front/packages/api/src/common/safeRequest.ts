import { AxiosInstance, AxiosRequestConfig } from "axios";
import { parseError } from "./errorHandler";
import type { TGetResponse, TMethod } from "./types";

/**
 * 공통 fetcher 함수
 * 백엔드 표준 응답 검증 후 데이터 반환
 * 공통 responseDTO 타입 반환
 * 에러 발생시 responseDTO 내 에러 메시지 및 status Code를 통한 에러반환
 * 각기 다른 에러 클래스 타입 반환으로 인한 application 단에서 에러 처리 용이
 * @author 홍규진
 */
async function request<T>(
  instance: AxiosInstance,
  method: TMethod,
  url: string,
  dataOrConfig?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    let response;

    if (method === "get" || method === "delete") {
      // 메서드 타입 체크 (get, delete 인 경우, config 옵션 사용 불가)
      response = await instance[method]<TGetResponse<T>>(url, dataOrConfig);
    } else {
      // 메서드 타입 체크 (post, put, patch 인 경우, config 옵션 사용 가능)
      response = await instance[method]<TGetResponse<T>>(
        url,
        dataOrConfig,
        config
      );
    }

    return response.data.result;
  } catch (err) {
    parseError(err);
  }
}

/**
 * 공통 safeRequest 함수
 * 각 application 단에서 사용하는 요청 함수를 공통화하여 사용할 수 있게 합니다.
 * @author 홍규진
 */
export const safeRequest = {
  get: <T>(instance: AxiosInstance, url: string, config?: AxiosRequestConfig) =>
    request<T>(instance, "get", url, config),

  post: <T>(
    instance: AxiosInstance,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => request<T>(instance, "post", url, data, config),

  put: <T>(
    instance: AxiosInstance,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => request<T>(instance, "put", url, data, config),

  delete: <T>(
    instance: AxiosInstance,
    url: string,
    config?: AxiosRequestConfig
  ) => request<T>(instance, "delete", url, config),

  patch: <T>(
    instance: AxiosInstance,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => request<T>(instance, "patch", url, data, config),
};
