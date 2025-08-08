import type { Member } from "../components/MemberList/types";

// 각 Step의 데이터 타입 정의
export interface Step0Data {
  selectedMemberId?: string;
  searchQuery: string;
  selectedMember?: Member;
}

export interface Step1Data {
  selectedDate?: Date;
  isToday: boolean;
}

export interface Step2Data {
  selectedComeTime: string;
  hour: string;
  minute: string;
  amPm: string;
}

export interface Step3Data {
  selectedGoneTime: string;
  hour: string;
  minute: string;
  amPm: string;
}

export interface Step4Data {
  isUsedCarService: boolean;
  carNumber: string;
}

// info-funnel에서 관리하는 데이터 타입 추후에 API 요청에 사용될 데이터 타입의 형태
export interface InfoFunnelData {
  recipientId: string;
  date: string; // "2025-08-01" 형식
  startTime: string; // "09:00" 형식
  endTime: string; // "17:00" 형식
  mobilityNumber: string; // "123가 4567" 형식
}
