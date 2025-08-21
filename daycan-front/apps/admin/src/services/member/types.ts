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

export type TmemberPatchRequest = Partial<TMemberCreateRequest>;
