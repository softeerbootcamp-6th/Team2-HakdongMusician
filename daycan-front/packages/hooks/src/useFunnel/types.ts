// 각 스텝별 이름을 저장 (모든 스탭의 이름은 STEP_ 로 시작)
export type Step = `STEP_${string}`;

// 각 스텝별 key, value 상태를 저장
export type StepData = Record<string, any>;

// Funnel 상태 관리 타입
export interface FunnelState {
  [key: string]: any; // 각 스텝별 key, value 상태를 저장
}

// 각 스텝별 상태를 저장
export interface FunnelStepState {
  step: string;
  data: StepData;
  timestamp: number;
}
