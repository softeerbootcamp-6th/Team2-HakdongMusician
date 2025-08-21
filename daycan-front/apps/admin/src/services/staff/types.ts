import type { Gender } from "@/types/gender";

export type TStaffRole = "DIRECTOR" | "SOCIAL_WORKER" | "CAREGIVER" | "UNKNOWN";

export type TStaff = {
  staffId: number;
  centerId: number;
  name: string;
  gender: Gender;
  staffRole: TStaffRole;
  birthDate: string;
  phoneNumber: string;
  avatarUrl: string;
};

export type TStaffCreateRequest = {
  name: string;
  gender: Gender;
  staffRole: TStaffRole;
  birthDate: string;
  phoneNumber: string;
  avatarUrl: string;
};

export type TStaffPatchRequest = Partial<TStaffCreateRequest>;
