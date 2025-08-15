import { safeRequest } from "@daycan/api";
import type {
  TMember,
  TMemberCreateRequest,
  TmemberPatchRequest,
} from "./types";
import { privateInstance } from "../instance";
import { handleError } from "@/services/error/handleError";

/**
 * 수급자 목록을 조회합니다.
 * @author 홍규진
 */
export const getMemberList = async (): Promise<TMember[] | null> => {
  try {
    const response = await safeRequest.get<TMember[]>(
      privateInstance,
      "/admin/member"
    );
    return response;
  } catch (error) {
    handleError(error);
    return Promise.resolve(null);
  }
};

/**
 * 단일 수급자 정보를 조회합니다.
 * @author 홍규진
 */
export const getMember = async (memberId: string): Promise<TMember | null> => {
  try {
    const response = await safeRequest.get<TMember>(
      privateInstance,
      `/admin/member/${memberId}`
    );
    return response;
  } catch (error) {
    handleError(error);
    return Promise.resolve(null);
  }
};

/**
 * 수급자 정보를 생성합니다.
 * @author 홍규진
 */
export const createMember = async (
  data: TMemberCreateRequest
): Promise<void> => {
  try {
    await safeRequest.post(privateInstance, "/admin/member", data);
  } catch (error) {
    handleError(error);
  }
};

/**
 * 수급자 정보를 수정합니다.
 * @author 홍규진
 */
export const updateMember = async (
  id: string,
  data: TmemberPatchRequest
): Promise<void> => {
  try {
    await safeRequest.patch(privateInstance, `/admin/member/${id}`, data);
  } catch (error) {
    handleError(error);
  }
};

/**
 * 수급자 정보를 삭제합니다.
 * @author 홍규진
 */
export const deleteMember = async (id: string): Promise<void> => {
  try {
    await safeRequest.delete(privateInstance, `/admin/member/${id}`);
  } catch (error) {
    handleError(error);
  }
};
