import { safeRequest } from "@daycan/api";
import type { TStaff, TStaffCreateRequest } from "./types";
import type { TStaffPatchRequest } from "./types";
import { privateInstance } from "../instance";
import { handleError } from "@/services/error/handleError";

export const getStaff = async (staffId: number): Promise<TStaff | null> => {
  try {
    const response = await safeRequest.get<TStaff>(
      privateInstance,
      `/staff/${staffId}`
    );
    return response;
  } catch (error) {
    handleError(error);
    return Promise.resolve(null);
  }
};

export const getStaffList = async (): Promise<TStaff[] | null> => {
  try {
    const response = await safeRequest.get<TStaff[]>(
      privateInstance,
      "/staff/list"
    );
    return response;
  } catch (error) {
    handleError(error);
    return Promise.resolve(null);
  }
};

export const createStaff = async (
  staff: TStaffCreateRequest
): Promise<void> => {
  try {
    await safeRequest.post(privateInstance, "/staff", staff);
  } catch (error) {
    handleError(error);
  }
};

export const updateStaff = async (
  staffId: number,
  staff: TStaffPatchRequest
): Promise<void> => {
  try {
    await safeRequest.patch(privateInstance, `/staff/${staffId}`, staff);
  } catch (error) {
    handleError(error);
  }
};
