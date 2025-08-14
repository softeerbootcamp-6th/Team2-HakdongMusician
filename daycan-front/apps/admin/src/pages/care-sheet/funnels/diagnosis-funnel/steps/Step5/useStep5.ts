import { useEffect } from "react";
import { useFunnel } from "@daycan/hooks";
import { useCanvas } from "../../hooks/useCanvas";

export const useStep5 = () => {
  const { toPrev, toNext, updateState, getStepState } = useFunnel();
  const {
    canvasRef,
    containerRef,
    points,
    setPoints,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    clear,
  } = useCanvas();

  // 기존 데이터가 있으면 로드
  useEffect(() => {
    const existingData = getStepState("STEP_5");
    if (existingData?.points) {
      setPoints(existingData.points);
    }
  }, [getStepState, setPoints]);

  // 포인터 업 시에만 상태 저장 (무한 렌더링 방지)
  const handlePointerUp: React.PointerEventHandler<HTMLCanvasElement> = (e) => {
    onPointerUp(e);
    updateState({ points });
  };

  const handleClear = () => {
    clear();
    updateState({ points: [] });
  };

  const handleNext = () => {
    updateState({ points });
    toNext();
  };

  return {
    canvasRef,
    containerRef,
    points,
    onPointerDown,
    onPointerMove,
    handlePointerUp,
    handleClear,
    handleNext,
    toPrev,
  };
};

