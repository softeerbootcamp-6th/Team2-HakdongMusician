import { createContext, useContext } from "react";
import type { Step } from "./types";

interface FunnelContextType {
  toNext: () => void;
  toPrev: () => void;
  toStep: (step: Step) => void;
  isFirst: boolean;
  isLast: boolean;
  currentIndex: number;
  currentStep: Step;
  steps: readonly Step[];
}

const FunnelContext = createContext<FunnelContextType | null>(null);

export function useFunnel() {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error("useFunnelContext must be used within FunnelProvider");
  }
  return context;
}

export { FunnelContext };
