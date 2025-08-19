import {
  type AdminMemberAndGuardianResponse,
  type MemberInfo,
  type GuardianInfo,
  type MemberDetailInfo,
} from "@/pages/member/constants/member";
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
  apiData: AdminMemberAndGuardianResponse,
  index: number
): MemberInfo => {
  return {
    id: index + 1, // 임시 ID (실제로는 API에서 받아와야 함)
    order: index + 1, // 순서 추가
    avatarUrl: apiData.avatarUrl,
    name: apiData.name,
    birthDate: apiData.birthDate,
    gender: convertGender(apiData.gender),
    username: apiData.username,
    guardianContact: apiData.guardianPhoneNumber,
    careLevel: apiData.careLevel,
    careGrade: convertCareLevel(apiData.careLevel), // 장기요양등급 문자열 추가
  };
};

// API 데이터를 Guardian으로 변환
export const convertApiToGuardian = (
  apiData: AdminMemberAndGuardianResponse
): GuardianInfo => {
  return {
    guardianName: apiData.guardianName,
    guardianRelation: apiData.guardianRelation,
    guardianRelationBirthDate: apiData.guardianRelationBirthDate,
    guardianPhoneNumber: apiData.guardianPhoneNumber,
    guardianAvatarUrl: apiData.guardianAvatarUrl,
    isSubscribed: apiData.isSubscribed,
  };
};

// API 데이터를 MemberDetailInfo로 변환
export const convertApiToMemberDetailInfo = (
  apiData: AdminMemberAndGuardianResponse,
  index: number
): MemberDetailInfo => {
  return {
    member: convertApiToElderMember(apiData, index),
    guardian: convertApiToGuardian(apiData),
  };
};
