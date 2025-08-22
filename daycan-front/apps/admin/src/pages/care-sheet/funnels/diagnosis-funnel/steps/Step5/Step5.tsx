import { DiagnosisCardLayout, DiagnosisLayout } from "../../components";
import { Body, Button, COLORS, Icon } from "@daycan/ui";
import {
  clearButton,
  signatureCanvas,
  signatureCanvasWrapper,
  signatureHint,
} from "./Step5.css";
import { StepButtons } from "@/pages/care-sheet/components/StepButtons";
import { useStep5 } from "./useStep5";
import { useFunnel } from "@daycan/hooks";
import { useUploadImageSingleMutation } from "@/services/image/useUploadImageMutation";
import { convertFunnelStateToDiagnosisFunnelData } from "../../utils/parsingData";
import { diagnosisFunnelDataAtom } from "../../atoms/diagnosisAtom";
import { useSetAtom } from "jotai";

export const Step5 = () => {
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
    getPNGFile,
    isSignatureUploaded,
    setIsSignatureUploaded,
  } = useStep5();
  const { mutate } = useUploadImageSingleMutation();
  const { updateState, funnelState } = useFunnel();
  const setDiagnosisData = useSetAtom(diagnosisFunnelDataAtom);

  const handleSignatureUpload = async () => {
    // PNG 데이터를 API로 전송하는 로직 예시
    const pngFile = await getPNGFile();
    if (pngFile) {
      mutate(pngFile, {
        onSuccess: (result) => {
          updateState({
            signatureUrl: result.objectKey,
          });

          // updateState 완료 후 diagnosisData 변환
          setTimeout(() => {
            const diagnosisData =
              convertFunnelStateToDiagnosisFunnelData(funnelState);
            setDiagnosisData(diagnosisData);
            setIsSignatureUploaded(true);
          }, 0);
        },
      });
    }
  };

  const handleNext = async () => {
    toNext();
  };

  return (
    <>
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
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                gap: "8px",
                width: "100%",
              }}
            >
              <Button
                variant="primary"
                onClick={handleSignatureUpload}
                style={{ flex: 1 }}
                size="fullWidth"
              >
                <Body type="small" weight={500}>
                  서명 확인
                </Body>
              </Button>
            </div>
          )}
        </DiagnosisCardLayout>
      </DiagnosisLayout>
      <StepButtons
        onPrev={toPrev}
        onNext={handleNext}
        isNextEnabled={isSignatureUploaded}
      />
    </>
  );
};
