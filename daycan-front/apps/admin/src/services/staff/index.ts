import { safeRequest } from "@daycan/api";
import type { TStaff, TStaffCreateRequest } from "./types";
import type { TStaffPatchRequest } from "./types";
import { privateInstance } from "../instance";

/**
 * 단일 직원 상세 조회
 * @param staffId 직원 ID
 * @returns 직원 상세
 * @author 홍규진
 */
export const getStaff = async (staffId: number): Promise<TStaff | null> => {
  return await safeRequest.get<TStaff>(
    privateInstance,
    `admin/staff/${staffId}`
  );
};

/**
 * 직원 목록 조회
 * @returns 직원 목록
 * @author 홍규진
 */
export const getStaffList = async (): Promise<TStaff[] | null> => {
  return await safeRequest.get<TStaff[]>(privateInstance, "admin/staff");
};

/**
 * 직원 생성
 * @param staff 직원 생성 요청
 * @returns 직원 생성
 * @author 홍규진
 */
export const createStaff = async (
  staff: TStaffCreateRequest
): Promise<void> => {
  return await safeRequest.post(privateInstance, "admin/staff", staff);
};

/**
 * 직원 수정
 * @param staffId 직원 ID
 * @param staff 직원 수정 요청
 * @returns 직원 수정
 * @author 홍규진
 */
export const updateStaff = async (
  staffId: number,
  staff: TStaffPatchRequest
): Promise<void> => {
  return await safeRequest.patch(
    privateInstance,
    `admin/staff/${staffId}`,
    staff
  );
};
