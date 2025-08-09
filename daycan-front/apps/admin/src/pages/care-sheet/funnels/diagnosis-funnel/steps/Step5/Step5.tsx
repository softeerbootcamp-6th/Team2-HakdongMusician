import { useEffect } from "react";
import { DiagnosisCardLayout, DiagnosisLayout } from "../../components";
import { Body, Button, COLORS, Icon } from "@daycan/ui";
import { useFunnel } from "@daycan/hooks";
import {
  clearButton,
  signatureCanvas,
  signatureCanvasWrapper,
  signatureHint,
} from "./Step5.css";
import { useCanvas } from "../../hooks/useCanvas";
import { StepButtons } from "@/pages/care-sheet/components/StepButtons";
import { useSetAtom } from "jotai";
import { resetAllFunnelsAtom } from "../../../molecule/finalMolecule";

export const Step5 = () => {
  const { toPrev, toNext, updateState, getStepState } = useFunnel();
  const resetAll = useSetAtom(resetAllFunnelsAtom);
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

  const handleNext = async () => {
    // 여기서 API 호출이 성공했다고 가정하고 초기화
    updateState({ points });
    await new Promise((_) => setTimeout(resetAll, 0));
    console.log("resetAll 발동 API 호출 후 초기화");
    toNext();
  };

  return (
    <DiagnosisLayout title="기록지 서명" nextTitle="끝">
      <DiagnosisCardLayout title="기록지 서명">
        <div ref={containerRef} className={signatureCanvasWrapper}>
          {points.length === 0 && (
            <Body
              className={signatureHint}
              type="small"
              color={COLORS.gray[300]}
            >
              손으로 이름을 써주세요
            </Body>
          )}
          <canvas
            ref={canvasRef}
            className={signatureCanvas}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={handlePointerUp}
          />
          <Button
            className={clearButton}
            variant="unEmphasized"
            onClick={handleClear}
          >
            <Icon name="delete" width={20} height={20} />
          </Button>
        </div>
      </DiagnosisCardLayout>
      <StepButtons onPrev={toPrev} onNext={handleNext} />
    </DiagnosisLayout>
  );
};
