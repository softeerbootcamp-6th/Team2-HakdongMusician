import {
  type MemberResponse,
  type ElderInfo,
  type Guardian,
  type MemberDetailInfo,
} from "@/types/elder";
// 성별 변환 함수
export const convertGender = (gender: "MALE" | "FEMALE"): string => {
  return gender === "MALE" ? "남성" : "여성";
};

// 장기요양등급 변환 함수
export const convertCareLevel = (careLevel: number): string => {
  return `${careLevel}등급`;
};

// API 데이터를 ElderMember로 변환
export const convertApiToElderMember = (
  apiData: MemberResponse,
  index: number
): ElderInfo => {
  return {
    id: index + 1, // 임시 ID (실제로는 API에서 받아와야 함)
    order: index + 1, // 순서 추가
    profileImage: apiData.avatarUrl,
    name: apiData.name,
    birthDate: apiData.birthDate,
    gender: convertGender(apiData.gender),
    careNumber: apiData.careNumber,
    guardianContact: apiData.guardianPhoneNumber,
    careLevel: apiData.careLevel,
    careGrade: convertCareLevel(apiData.careLevel), // 장기요양등급 문자열 추가
  };
};

// API 데이터를 Guardian으로 변환
export const convertApiToGuardian = (apiData: MemberResponse): Guardian => {
  return {
    name: apiData.guardianName,
    relation: apiData.guardianRelation,
    birthDate: apiData.guardianRelationBirthDate,
    phoneNumber: apiData.guardianPhoneNumber,
    avatarUrl: apiData.guardianAvatarUrl,
    isSubscribed: apiData.isSubscribed,
  };
};

// API 데이터를 MemberDetailInfo로 변환
export const convertApiToMemberDetailInfo = (
  apiData: MemberResponse,
  index: number
): MemberDetailInfo => {
  return {
    member: convertApiToElderMember(apiData, index),
    guardian: convertApiToGuardian(apiData),
  };
};
