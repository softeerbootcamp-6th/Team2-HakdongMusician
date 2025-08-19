import { FunnelProvider, FunnelStep, type FunnelState } from "@daycan/hooks";
import { Step0, Step1, Step2, Step3, Step4, Step5 } from "./steps";
import { diagnosisFunnelSteps } from "../../constants/steps";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { diagnosisFunnelDataAtom } from "./atoms/diagnosisAtom";
import { convertFunnelStateToDiagnosisFunnelData } from "./utils/parsingData";
import { infoFunnelDataAtom } from "../info-funnel/atoms/infoAtom";
import { useNavigate } from "react-router-dom";
import type { DiagnosisFunnelData } from "./types/diagnosisType";
import {
  MEAL_AMOUNT_CODE_TO_LABEL,
  MEAL_TYPE_CODE_TO_LABEL,
} from "./constants/diagnosis";
import { getStoredValue } from "../utils/storage";
import { useWriteCareSheetMutation } from "@/services/careSheet/useCareSheetMutation";
import { combineFunnelData } from "../utils/atomUtil";
import { homeFunnelDataAtom } from "../home-funnel/atoms/homeAtom";
import type { TCareSheetWriteRequest } from "@/services/careSheet/types";
import { useToast } from "@daycan/ui";
import { resetAllFunnelsAtom } from "../molecule/finalMolecule";

export const DiagnosisFunnelStepContainer = () => {
  const navigate = useNavigate();
  const setDiagnosisData = useSetAtom(diagnosisFunnelDataAtom);
  const homeData = useAtomValue(homeFunnelDataAtom);
  const infoData = useAtomValue(infoFunnelDataAtom);
  const diagnosisData = useAtomValue(diagnosisFunnelDataAtom);
  const { showToast } = useToast();
  const resetAllFunnels = useSetAtom(resetAllFunnelsAtom);
  const writeCareSheetMutation = useWriteCareSheetMutation();
  // info 퍼널 데이터가 없으면 info 퍼널로 이동 (atom 초기 null hydration 대비 로컬스토리지도 확인)
  useEffect(() => {
    const stored = getStoredValue("careSheet:infoFunnel");
    if (stored === null) {
      navigate("/care-sheet/new/info", { replace: true });
    }
  }, [infoData]);

  const handleComplete = (funnelState: FunnelState) => {
    const diagnosisData = convertFunnelStateToDiagnosisFunnelData(funnelState);
    setDiagnosisData(diagnosisData);

    // 모든 퍼널 데이터를 합쳐서 제출 요청 생성
    const writeCareSheetRequest = combineFunnelData(
      homeData,
      infoData,
      diagnosisData
    ) as TCareSheetWriteRequest;

    // 제출 요청이 없으면 종료
    if (!writeCareSheetRequest) {
      showToast({
        data: {
          message: "필수 데이터가 누락되었습니다.",
          type: "error",
          variant: "mobile",
        },
        autoClose: 1000,
      });
      return;
    }

    // 제출 요청 전송
    writeCareSheetMutation.mutate(writeCareSheetRequest, {
      onSuccess: () => {
        resetAllFunnels(); // 퍼널 상태 초기화

        // 토스트 메시지 표시
        showToast({
          data: {
            message: "기록지 작성이 완료되었습니다.",
            type: "success",
            variant: "pc",
          },
          autoClose: 1500,
          hideProgressBar: true,
        });

        // photo-funnel로 이동
        navigate("/care-sheet/new/");
      },
      onError: (error) => {
        // 에러 발생 시 토스트 메시지 표시
        showToast({
          data: {
            message: "기록지 작성 중 오류가 발생했습니다.",
            type: "error",
            variant: "pc",
          },
          autoClose: 1000,
        });
        console.error(error);
      },
    });
  };

  // photo-funnel로부터 채워진 diagnosis atom을 funnelState로 프리필하고 바로 Step4로 진입
  const initialState: FunnelState | undefined = useMemo(() => {
    const d: DiagnosisFunnelData | null = diagnosisData;
    if (!d) return undefined;
    return {
      STEP_0: {
        isWashHelperChecked: d.physical.assistWashing,
        isMoveHelperChecked: d.physical.assistMovement,
        isBathHelperChecked: d.physical.assistBathing,
        isBreakfastChecked: d.physical.breakfast.provided,
        breakfastType:
          MEAL_TYPE_CODE_TO_LABEL[d.physical.breakfast.entry.mealType || ""] ||
          d.physical.breakfast.entry.mealType,
        breakfastAmount:
          MEAL_AMOUNT_CODE_TO_LABEL[d.physical.breakfast.entry.amount || ""] ||
          d.physical.breakfast.entry.amount,
        isLunchChecked: d.physical.lunch.provided,
        lunchType:
          MEAL_TYPE_CODE_TO_LABEL[d.physical.lunch.entry.mealType || ""] ||
          d.physical.lunch.entry.mealType,
        lunchAmount:
          MEAL_AMOUNT_CODE_TO_LABEL[d.physical.lunch.entry.amount || ""] ||
          d.physical.lunch.entry.amount,
        isDinnerChecked: d.physical.dinner.provided,
        dinnerType:
          MEAL_TYPE_CODE_TO_LABEL[d.physical.dinner.entry.mealType || ""] ||
          d.physical.dinner.entry.mealType,
        dinnerAmount:
          MEAL_AMOUNT_CODE_TO_LABEL[d.physical.dinner.entry.amount || ""] ||
          d.physical.dinner.entry.amount,
        urineCount: d.physical.numberOfUrine,
        stoolCount: d.physical.numberOfStool,
        physicalActivity: d.physical.comment,
      },
      STEP_1: {
        isCognitiveHelperChecked: d.cognitive.assistCognitiveCare,
        isCommunicationHelperChecked: d.cognitive.assistCommunication,
        physicalActivity: d.cognitive.comment,
      },
      STEP_2: {
        isHealthManagementChecked: d.healthCare.healthCare,
        isNursingManagementChecked: d.healthCare.nursingCare,
        isEmergencyServiceChecked: d.healthCare.emergencyService,
        systolic: d.healthCare.bloodPressure.systolic,
        diastolic: d.healthCare.bloodPressure.diastolic,
        temperature: d.healthCare.temperature.temperature,
        healthManageSpecialNote: d.healthCare.comment,
      },
      STEP_3: {
        isTrainingChecked: d.recoveryProgram.motionTraining,
        isCognitiveActivityTrainingChecked: d.recoveryProgram.cognitiveProgram,
        isCognitiveFunctionEnhancementTrainingChecked:
          d.recoveryProgram.cognitiveEnhancement,
        isPhysicalTherapyChecked: d.recoveryProgram.physicalTherapy,
        trainingSpecialNote: d.recoveryProgram.comment,
        programEntries: d.recoveryProgram.programEntries,
        signatureUrl: d.signatureUrl,
      },
    } as FunnelState;
  }, [diagnosisData]);

  return (
    <FunnelProvider
      steps={diagnosisFunnelSteps}
      funnelId="diagnosis-funnel"
      onComplete={handleComplete}
      initialState={initialState}
      initialStep={initialState ? "STEP_4" : undefined}
    >
      <FunnelStep name="STEP_0">
        <Step0 />
      </FunnelStep>
      <FunnelStep name="STEP_1">
        <Step1 />
      </FunnelStep>
      <FunnelStep name="STEP_2">
        <Step2 />
      </FunnelStep>
      <FunnelStep name="STEP_3">
        <Step3 />
      </FunnelStep>
      <FunnelStep name="STEP_4">
        <Step4 />
      </FunnelStep>
      <FunnelStep name="STEP_5">
        <Step5 />
      </FunnelStep>
    </FunnelProvider>
  );
};
