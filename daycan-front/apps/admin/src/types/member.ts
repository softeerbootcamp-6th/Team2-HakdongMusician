export type HeaderColumn = {
  key: string; // 컬럼의 고유 키
  width?: string; // 컬럼의 너비 (선택적)
  text: string; // 컬럼의 텍스트 (선택적)
};

export type DataColumn = {
  key: string; // 데이터의 고유 키
  field: string; // 데이터의 필드 이름
  width?: string; // 데이터의 너비 (선택적)
};

// API 응답 타입 (백엔드에서 받아오는 원본 데이터)
export type AdminMemberAndGuardianResponse = {
  name: string;
  order?: number; // 선택적 속성으로 변경
  gender: "MALE" | "FEMALE";
  birthDate: string;
  careLevel: number;
  avatarUrl: string;
  careNumber: string;
  guardianName: string;
  guardianRelation: string;
  guardianRelationBirthDate: string;
  guardianPhoneNumber: string;
  guardianAvatarUrl: string;
  isSubscribed: boolean;
};

// 수급자 데이터 타입 (화면에서 사용하는 타입)
export type MemberInfo = {
  id: number;
  order?: number; // 순서 필드 추가
  avatarUrl?: string;
  name: string;
  birthDate: string;
  gender: string;
  careNumber: string;
  guardianContact: string;
  careLevel?: number;
  careGrade?: string; // 장기요양등급 문자열
};

// 보호자 정보 타입
export type GuardianInfo = {
  guardianName: string;
  guardianRelation: string;
  guardianRelationBirthDate: string;
  guardianPhoneNumber: string;
  guardianAvatarUrl?: string;
  isSubscribed: boolean;
};

// 멤버 상세 정보 타입 (수급자 + 보호자)
export type MemberDetailInfo = {
  member: MemberInfo;
  guardian: GuardianInfo;
};
