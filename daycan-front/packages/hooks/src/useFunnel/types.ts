import type { ReactNode } from "react";

export type Step = `STEP_${string}`;

export interface FunnelStepProps<T extends string> {
  name: T;
  children: ReactNode;
}

export interface FunnelProviderProps<TSteps extends readonly string[]> {
  steps: TSteps;
  funnelId?: string; // 여러 Funnel을 구분하기 위한 ID
  onComplete?: () => void; // 퍼널 완료 시 호출될 콜백
  children: ReactNode;
}
