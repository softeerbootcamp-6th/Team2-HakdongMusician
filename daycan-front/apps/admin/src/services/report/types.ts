import type { YearMonthDay } from "@/types/date";
import type { Gender } from "@/types/gender";

export type TReportStatus =
  | "NOT_APPLICABLE"
  | "PENDING"
  | "CREATED"
  | "REVIEWED"
  | "SENDING"
  | "RESERVED"
  | "DONE";

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
