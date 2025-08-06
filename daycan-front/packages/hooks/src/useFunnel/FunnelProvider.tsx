import { useState, useMemo } from "react";
import { FunnelContext } from "./FunnelContext";
import type { FunnelProviderProps, Step } from "./types";

export function FunnelProvider<TSteps extends readonly Step[]>({
  steps,
  funnelId,
  onComplete,
  children,
}: FunnelProviderProps<TSteps>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const value = useMemo(() => {
    const currentStep = steps[currentIndex];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === steps.length - 1;

    const toNext = () => {
      if (isLast && onComplete) {
        onComplete();
        console.log("Funnel 종료: ", funnelId);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, steps.length - 1));
      }
    };

    const toPrev = () => {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const toStep = (step: Step) => {
      const index = steps.indexOf(step);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    };

    return {
      steps,
      currentIndex,
      currentStep,
      isFirst,
      isLast,
      toNext,
      toPrev,
      toStep,
    };
  }, [steps, currentIndex, onComplete]);

  return (
    <FunnelContext.Provider value={value}>{children}</FunnelContext.Provider>
  );
}
