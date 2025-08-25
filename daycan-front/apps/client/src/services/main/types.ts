export type TGetHomeDataResponse = {
  name: string;
  gender: string;
  guardianName: string;
  avatarUrl: string;
  // 1. true: 리포트 도착,
  // 2. false: 이미 읽었음,
  // 3. null: 오늘 리포트 없음
  isReportArrived: boolean | null;
  weeklyScore: number;
  weeklyChangeAmount: number;
};
