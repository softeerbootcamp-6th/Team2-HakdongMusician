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
  CognitiveCardFooter: TReportCardFooter;
};
