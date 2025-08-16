import memberImage from "@/assets/images/memberRegister.png";
import guardianImage from "@/assets/images/guardianRegister.png";

// API 형태의 더미 데이터

export type TMember = {
  memberId: string;
  userCode: string;
  name: string;
  gender: string;
  birthDate: string;
  careLevel: number;
  avatarUrl: string;
  careNumber: string;
  guardianName: string;
  guardianRelation: string;
  guardianRelationBirthDate: string;
  guardianPhoneNumber: string;
  guardianAvatarUrl: string;
  acceptReport: boolean;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
};

export const API_ELDER_DUMMY_DATA: TMember[] = [
  {
    memberId: "1",
    userCode: "AA1234597",
    name: "김큐티빠띠엔젤할무니",
    gender: "FEMALE" as const,
    birthDate: "1945-03-15",
    careLevel: 1,
    avatarUrl: memberImage,
    careNumber: "L1323435678",
    guardianName: "소소보루보루소소보루루루루루",
    guardianRelation: "딸",
    guardianRelationBirthDate: "1975-08-20",
    guardianPhoneNumber: "010-1234-5678",
    guardianAvatarUrl: guardianImage,
    acceptReport: true,
    organizationId: "CTR00001234",
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
  },
  {
    memberId: "2",
    userCode: "BB87654321",
    name: "박영수",
    gender: "MALE" as const,
    birthDate: "1950-07-22",
    careLevel: 2,
    avatarUrl: memberImage,
    careNumber: "L2222435678",
    guardianName: "박정민",
    guardianRelation: "아들",
    guardianRelationBirthDate: "1980-12-10",
    guardianPhoneNumber: "010-8765-4321",
    guardianAvatarUrl: guardianImage,
    acceptReport: false,
    organizationId: "CTR00001234",
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
  },
  {
    memberId: "3",
    userCode: "CC11223344",
    name: "이미경",
    gender: "FEMALE" as const,
    birthDate: "1948-11-08",
    careLevel: 3,
    avatarUrl: memberImage,
    careNumber: "L3411222334",
    guardianName: "이상훈",
    guardianRelation: "아들",
    guardianRelationBirthDate: "1978-05-15",
    guardianPhoneNumber: "010-1122-3344",
    guardianAvatarUrl: guardianImage,
    acceptReport: true,
    organizationId: "CTR00001234",
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
  },
  {
    memberId: "4",
    userCode: "DD55667788",
    name: "최철수",
    gender: "MALE" as const,
    birthDate: "1952-01-30",
    careLevel: 4,
    avatarUrl: memberImage,
    careNumber: "L9556673378",
    guardianName: "최민정",
    guardianRelation: "딸",
    guardianRelationBirthDate: "1982-03-25",
    guardianPhoneNumber: "010-5566-7788",
    guardianAvatarUrl: guardianImage,
    acceptReport: true,
    organizationId: "CTR00001234",
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
  },
  {
    memberId: "5",
    userCode: "AA1234567",
    name: "홍노인",
    gender: "MALE" as const,
    birthDate: "1950-05-12",
    careLevel: 5,
    avatarUrl: memberImage,
    careNumber: "L5123456711",
    guardianName: "이보호자",
    guardianRelation: "딸",
    guardianRelationBirthDate: "1978-10-02",
    guardianPhoneNumber: "010-1234-5678",
    guardianAvatarUrl: guardianImage,
    acceptReport: true,
    organizationId: "CTR00001234",
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-01T00:00:00",
  },
];
