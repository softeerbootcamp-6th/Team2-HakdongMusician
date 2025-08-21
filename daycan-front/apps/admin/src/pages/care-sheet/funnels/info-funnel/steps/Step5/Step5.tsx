import { InfoFunnelLayout } from "../../components/InfoFunnelLayout";
import { StepButtons } from "@/pages/care-sheet/components/StepButtons";
import { step5InfoContainer, step5InfoRow } from "./Step5.css";
import { useFunnel } from "@daycan/hooks";
import { Body, COLORS } from "@daycan/ui";

export const Step5 = () => {
  const { toNext, toPrev, funnelState } = useFunnel();

  // 각 Step의 데이터 가져오기
  const step0Data = funnelState.STEP_0;
  const step1Data = funnelState.STEP_1;
  const step2Data = funnelState.STEP_2;
  const step3Data = funnelState.STEP_3;
  const step4Data = funnelState.STEP_4;

  return (
    <>
      <InfoFunnelLayout>
        <Body type="large" weight={600} color={COLORS.gray[800]}>
          아래 수급자의 기록지 작성을 시작할까요?
        </Body>

        <div className={step5InfoContainer}>
          {/* 입력된 데이터 확인 */}
          <div className={step5InfoRow}>
            <Body type="medium" weight={600} color={COLORS.gray[800]}>
              입력 확인
            </Body>
          </div>

          {/* Step0: 수급자 */}
          <div className={step5InfoRow}>
            <Body type="small" weight={600} color={COLORS.gray[600]}>
              수급자 ID:
            </Body>
            <Body type="small" weight={600} color={COLORS.gray[800]}>
              {step0Data?.memberId || "선택되지 않음"}
            </Body>
          </div>

          {/* Step1: 이용 날짜 */}
          <div className={step5InfoRow}>
            <Body type="small" weight={600} color={COLORS.gray[600]}>
              이용 날짜:
            </Body>
            <Body type="small" weight={600} color={COLORS.gray[800]}>
              {step1Data?.isToday
                ? "오늘"
                : step1Data?.date
                  ? new Date(step1Data.date).toLocaleDateString("ko-KR")
                  : "선택되지 않음"}
            </Body>
          </div>

          {/* Step2: 시작 시간 */}
          <div className={step5InfoRow}>
            <Body type="small" weight={600} color={COLORS.gray[600]}>
              시작 시간:
            </Body>
            <Body type="small" weight={600} color={COLORS.gray[800]}>
              {step2Data?.startTime || "선택되지 않음"}
            </Body>
          </div>

          {/* Step3: 종료 시간 */}
          <div className={step5InfoRow}>
            <Body type="small" weight={600} color={COLORS.gray[600]}>
              종료 시간:
            </Body>
            <Body type="small" weight={600} color={COLORS.gray[800]}>
              {step3Data?.endTime || "선택되지 않음"}
            </Body>
          </div>

          {/* Step4: 이동서비스 */}
          <div className={step5InfoRow}>
            <Body type="small" weight={600} color={COLORS.gray[600]}>
              차량번호:
            </Body>
            <Body type="small" weight={600} color={COLORS.gray[800]}>
              {step4Data?.isUsedCarService
                ? step4Data.carNumber || "차량번호 미입력"
                : "미이용"}
            </Body>
          </div>
        </div>
      </InfoFunnelLayout>
      <StepButtons isNextEnabled={true} onNext={toNext} onPrev={toPrev} />
    </>
  );
};
