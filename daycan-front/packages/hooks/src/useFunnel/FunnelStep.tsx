import { useFunnel } from "./FunnelContext";
import type { FunnelStepProps } from "./types";

export function FunnelStep<TSteps extends readonly string[]>({
  name,
  children,
}: FunnelStepProps<TSteps[number]>) {
  const { currentStep } = useFunnel();
  if (currentStep !== name) return null;
  return <>{children}</>;
}
