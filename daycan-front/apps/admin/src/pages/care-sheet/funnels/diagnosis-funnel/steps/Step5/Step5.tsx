import { DiagnosisCardLayout, DiagnosisLayout } from "../../components";
import { Body, Button, COLORS, Icon } from "@daycan/ui";
import {
  clearButton,
  signatureCanvas,
  signatureCanvasWrapper,
  signatureHint,
} from "./Step5.css";
import { StepButtons } from "@/pages/care-sheet/components/StepButtons";
import { useSetAtom } from "jotai";
import { resetAllFunnelsAtom } from "../../../molecule/finalMolecule";
import { useStep5 } from "./useStep5";
import { useFunnel } from "@daycan/hooks";

export const Step5 = () => {
  const resetAll = useSetAtom(resetAllFunnelsAtom);
  const { toNext } = useFunnel();
  const {
    canvasRef,
    containerRef,
    points,
    onPointerDown,
    onPointerMove,
    handlePointerUp,
    handleClear,
    toPrev,
    downloadPNG,
    getPNGBlob,
  } = useStep5();

  const handleNext = async () => {
    // PNG 데이터를 API로 전송하는 로직 예시
    const pngBlob = await getPNGBlob();
    if (pngBlob) {
      console.log("서명 PNG 데이터:", pngBlob);
      // 여기서 실제 API 호출
      // await uploadSignature(pngBlob);
    }

    toNext();
    // 여기서 API 호출이 성공했다고 가정하고 초기화
    await new Promise((_) => setTimeout(resetAll, 0));
    console.log("resetAll 발동 API 호출 후 초기화");
  };

  const handleExportPNG = () => {
    downloadPNG();
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

        {/* PNG 추출 버튼 */}
        {points.length > 0 && (
          <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
            <Button
              variant="unEmphasized"
              onClick={handleExportPNG}
              style={{ flex: 1 }}
            >
              <Icon name="download" width={16} height={16} />
              <Body type="small" weight={500}>
                서명 PNG 다운로드 테스트
              </Body>
            </Button>
          </div>
        )}
      </DiagnosisCardLayout>
      <StepButtons onPrev={toPrev} onNext={handleNext} />
    </DiagnosisLayout>
  );
};
