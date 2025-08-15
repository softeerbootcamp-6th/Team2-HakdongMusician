export const GENDER_MAP = { MALE: "남성", FEMALE: "여성" } as const;
export const ROLE_MAP = {
  DIRECTOR: "센터장",
  SOCIAL_WORKER: "사회복지사",
  CAREGIVER: "간호사",
} as const;

// 직무 옵션 정의
export const staffRoleOptions = [
  { value: "SOCIAL_WORKER", label: "사회복지사" },
  { value: "CAREGIVER", label: "요양보호사" },
  { value: "DIRECTOR", label: "센터장" },
];
