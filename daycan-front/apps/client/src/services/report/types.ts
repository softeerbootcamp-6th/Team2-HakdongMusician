import type { YearMonthDay } from "@/types/date";

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

export type TReport = {
  memberName: string;
  gender: "MALE" | "FEMALE";
  fullReportDto: {
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
};

export type TReportList = {
  reportedDates: YearMonthDay[];
};
