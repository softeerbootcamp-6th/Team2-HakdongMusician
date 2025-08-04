import { type AxiosRequestConfig, isAxiosError } from "axios";
import { instance } from "./instance";
import { HttpError, ServerError } from "./types";
import type { TGetResponse } from "./types";

/**
 * GET 요청 함수
 * @param url - API 엔드포인트 URL
 * @param config - 추가적인 axios 설정
 * @returns TGetResponse<T>의 result 부분만 반환
 * @author 홍규진
 */
export async function get<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await instance.get<TGetResponse<T>>(url, config);
    return response.data.result;
  } catch (err) {
    handleError(err);
  }
}

/**
 * POST 요청 함수
 * @param url - API 엔드포인트 URL
 * @param data - 요청 데이터
 * @param config - 추가적인 axios 설정
 * @returns TGetResponse<T>의 result 부분만 반환
 * @author 홍규진
 */
export async function post<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await instance.post<TGetResponse<T>>(url, data, config);
    return response.data.result;
  } catch (err) {
    handleError(err);
  }
}

/**
 * PUT 요청 함수
 * @param url - API 엔드포인트 URL
 * @param data - 요청 데이터
 * @param config - 추가적인 axios 설정
 * @returns TGetResponse<T>의 result 부분만 반환
 * @author 홍규진
 */
export async function put<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await instance.put<TGetResponse<T>>(url, data, config);
    return response.data.result;
  } catch (err) {
    handleError(err);
  }
}

/**
 * DELETE 요청 함수
 * @param url - API 엔드포인트 URL
 * @param config - 추가적인 axios 설정
 * @returns TGetResponse<T>의 result 부분만 반환
 * @author 홍규진
 */
export async function del<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await instance.delete<TGetResponse<T>>(url, config);
    return response.data.result;
  } catch (err) {
    handleError(err);
  }
}

/**
 * PATCH 요청 함수
 * @param url - API 엔드포인트 URL
 * @param data - 요청 데이터
 * @param config - 추가적인 axios 설정
 * @returns TGetResponse<T>의 result 부분만 반환
 * @author 홍규진
 */
export async function patch<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await instance.patch<TGetResponse<T>>(url, data, config);
    return response.data.result;
  } catch (err) {
    handleError(err);
  }
}

/**
 * 에러 처리 헬퍼 함수
 * 400 대인지, 500 대인지 확인하고 에러를 던집니다.
 * 추후에 해당 에러를 ErrorBoundary로 받아서 처리하는 로직을 추가할 예정입니다.
 * @author 홍규진
 */
function handleError(err: unknown): never {
  if (isAxiosError(err)) {
    const status = err.response?.status || 0;
    const message = err.response?.data.message || err.message;
    console.error("🚨 Error:", err);
    if (status >= 400 && status < 500) {
      throw new HttpError(status, message);
    } else if (status >= 500) {
      throw new ServerError(message);
    } else {
      throw new HttpError(status, message);
    }
  }

  throw err;
}
