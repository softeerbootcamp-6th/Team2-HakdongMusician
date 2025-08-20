import type { YearMonthDay } from "@/types/date";
import type { Gender } from "@/types/gender";

export type TReportStatus =
  | "NOT_APPLICABLE" // 출석을 안 함
  | "PENDING" // 출석은 했는데, 기록지 작성 안함
  | "CREATED" // 기록지 작성 완료
  | "REVIEWED" // 검토 완료
  | "SENDING" // 전송 중
  | "RESERVED" // 예약 완료
  | "DONE"; // 전송 완료

export type TReportListItem = {
  id: number;
  memberMetaEntry: {
    memberId: string;
    name: string;
    birthDate: YearMonthDay;
    gender: Gender;
  };
  guardianMetaEntry: {
    guardianName: string;
    guardianContact: string;
  };
  status: TReportStatus;
};

export type TReportEntry = {
  key: string;
  value: string;
  warning: string;
  additionalInfo: string;
};

export type TReportCardFooter = {
  score: number;
  additionalMemo: string;
};

export type TReportReadResponse = {
  totalScore: number;
  changeAmount: number;
  mealScore: number;
  healthScore: number;
  physicalScore: number;
  cognitiveScore: number;
  mealEntries: TReportEntry[];
  mealCardFooter: TReportCardFooter;
  healthEntries: TReportEntry[];
  healthCardFooter: TReportCardFooter;
  physicalEntries: TReportEntry[];
  physicalCardFooter: TReportCardFooter;
  cognitiveEntries: TReportEntry[];
  cognitiveCardFooter: TReportCardFooter;
};

export type TReportEditRequest = {
  mealEntries: TReportEntry[];
  physicalEntries: TReportEntry[];
  cognitiveEntries: TReportEntry[];
  healthEntries: TReportEntry[];
  mealMemo: string;
  healthMemo: string;
  physicalMemo: string;
  cognitiveMemo: string;
};
