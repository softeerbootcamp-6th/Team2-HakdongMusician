import { safeRequest } from "@daycan/api";
import type { TStaff, TStaffCreateRequest } from "./types";
import type { TStaffPatchRequest } from "./types";
import { privateInstance } from "../instance";

export const getStaff = async (staffId: number): Promise<TStaff | null> => {
  return await safeRequest.get<TStaff>(privateInstance, `/staff/${staffId}`);
};

export const getStaffList = async (): Promise<TStaff[] | null> => {
  return await safeRequest.get<TStaff[]>(privateInstance, "/staff/list");
};

export const createStaff = async (
  staff: TStaffCreateRequest
): Promise<void> => {
  return await safeRequest.post(privateInstance, "/staff", staff);
};

export const updateStaff = async (
  staffId: number,
  staff: TStaffPatchRequest
): Promise<void> => {
  return await safeRequest.patch(privateInstance, `/staff/${staffId}`, staff);
};
