export type TMember = {
  id: number;
  careNumber: string;
  name: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  careLevel: number;
  avatarUrl: string;
  guardianName: string;
  guardianRelation: string;
  guardianBirthDate: string;
  guardianPhoneNumber: string;
  guardianAvatarUrl: string;
  acceptReport: boolean;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
};

export type TMemberCreateRequest = {
  name: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  careLevel: number;
  careNumber: string;
  avatarUrl: string;
  guardianName: string;
  guardianRelation: string;
  guardianBirthDate: string;
  guardianPhoneNumber: string;
  guardianAvatarUrl: string;
  reportConsent: boolean;
  passwordEntry: {
    guardianPassword: string | null;
    guardianPasswordConfirm: string | null;
    passwordConfirmed: boolean;
  };
};

export type TmemberPatchRequest = {
  name?: string | null;
  gender?: "MALE" | "FEMALE";
  birthDate?: string | null;
  careLevel?: number;
  careNumber?: string | null;
  avatarUrl?: string | null;
  guardianName?: string | null;
  guardianRelation?: string | null;
  guardianBirthDate?: string | null;
  guardianPhoneNumber?: string | null;
  guardianAvatarUrl?: string | null;
  reportConsent?: boolean;
  passwordEntry?: {
    guardianPassword: string | null;
    guardianPasswordConfirm: string | null;
    passwordConfirmed: boolean;
  } | null;
};
