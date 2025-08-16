import { safeRequest } from "@daycan/api";
import type {
  TMember,
  TMemberCreateRequest,
  TmemberPatchRequest,
} from "./types";
import { privateInstance } from "../instance";

/**
 * 수급자 목록을 조회합니다.
 * @author 홍규진
 */
export const getMemberList = async (): Promise<TMember[] | null> => {
  return await safeRequest.get<TMember[]>(privateInstance, "/admin/member");
};

/**
 * 단일 수급자 정보를 조회합니다.
 * @author 홍규진
 */
export const getMember = async (memberId: string): Promise<TMember | null> => {
  return await safeRequest.get<TMember>(
    privateInstance,
    `/admin/member/${memberId}`
  );
};

/**
 * 수급자 정보를 생성합니다.
 * @author 홍규진
 */
export const createMember = async (
  data: TMemberCreateRequest
): Promise<void> => {
  return await safeRequest.post(privateInstance, "/admin/member", data);
};

/**
 * 수급자 정보를 수정합니다.
 * @author 홍규진
 */
export const updateMember = async (
  id: string,
  data: TmemberPatchRequest
): Promise<void> => {
  return await safeRequest.patch(privateInstance, `/admin/member/${id}`, data);
};

/**
 * 수급자 정보를 삭제합니다.
 * @author 홍규진
 */
export const deleteMember = async (id: string): Promise<void> => {
  return await safeRequest.delete(privateInstance, `/admin/member/${id}`);
};
