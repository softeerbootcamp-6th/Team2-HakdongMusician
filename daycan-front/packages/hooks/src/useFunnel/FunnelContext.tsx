import { createContext, useContext } from "react";
import type { Step, FunnelState, FunnelStepState } from "./types";

interface FunnelContextType {
  toNext: () => void;
  toPrev: () => void;
  toStep: (step: Step) => void;
  isFirst: boolean;
  isLast: boolean;
  currentIndex: number;
  currentStep: Step;
  steps: readonly Step[];
  // 상태 관리 함수들
  updateState: (stepData: any) => void;
  getStepState: (stepName: string) => any;
  getStepHistory: () => FunnelStepState[];
  clearState: () => void;
  funnelState: FunnelState;
}

const FunnelContext = createContext<FunnelContextType | null>(null);

export function useFunnel() {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error("useFunnel must be used within FunnelProvider");
  }
  return context;
}

export { FunnelContext };
