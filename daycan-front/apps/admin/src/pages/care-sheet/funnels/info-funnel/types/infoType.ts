import type { TTime, YearMonthDay } from "@/types/date";
import type { Member } from "../components/MemberList/types";

// 각 Step의 데이터 타입 정의
export interface Step0Data {
  memberId?: number;
  searchQuery: string;
  selectedMember?: Member;
}

export interface Step1Data {
  date?: Date;
  isToday: boolean;
}

export interface Step2Data {
  startTime: string;
  hour: string;
  minute: string;
  amPm: string;
}

export interface Step3Data {
  endTime: string;
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
  memberId: number;
  date: YearMonthDay;
  startTime: TTime;
  endTime: TTime;
  mobilityNumber: string; // "123가 4567" 형식
}
