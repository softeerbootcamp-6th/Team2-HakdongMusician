import { type ReactNode } from "react";
import { useFunnel } from "./FunnelContext";

export interface FunnelStepProps<T extends string> {
  name: T;
  children: ReactNode;
}

export function FunnelStep<TSteps extends readonly string[]>({
  name,
  children,
}: FunnelStepProps<TSteps[number]>) {
  const { currentStep } = useFunnel();
  if (currentStep !== name) return null;
  return <>{children}</>;
}
