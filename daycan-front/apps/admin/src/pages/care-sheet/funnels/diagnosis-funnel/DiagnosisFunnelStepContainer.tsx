import { FunnelProvider, FunnelStep, type FunnelState } from "@daycan/hooks";
import { Step0, Step1, Step2, Step3, Step4, Step5 } from "./steps";
import { diagnosisFunnelSteps } from "../../constants/steps";
import { useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";
import { diagnosisFunnelDataAtom } from "./atoms/diagnosisAtom";
import { convertFunnelStateToDiagnosisFunnelData } from "./utils/parsingData";
import { infoFunnelDataAtom } from "../info-funnel/atoms/infoAtom";
import { useNavigate } from "react-router-dom";
import type { DiagnosisFunnelData } from "./types/diagnosisType";
import {
  MEAL_AMOUNT_CODE_TO_LABEL,
  MEAL_TYPE_CODE_TO_LABEL,
} from "./constants/diagnosis";
import { useWriteCareSheetMutation } from "@/services/careSheet/useCareSheetMutation";
import { useToast } from "@daycan/ui";
import {
  combinedCareSheetAtom,
  resetAllFunnelsAtom,
} from "../molecule/finalMolecule";
import { validateCareSheetData } from "../utils/atomUtil";
import type { TCareSheetWriteRequest } from "@/services/careSheet/types";
import { getStoredValue } from "../utils/storage";

export const DiagnosisFunnelStepContainer = () => {
  const navigate = useNavigate();
  const infoData = useAtomValue(infoFunnelDataAtom);

  const setDiagnosisData = useSetAtom(diagnosisFunnelDataAtom);
  const diagnosisData = useAtomValue(diagnosisFunnelDataAtom);

  const { showToast } = useToast();
  const resetAllFunnels = useSetAtom(resetAllFunnelsAtom);
  const writeCareSheetRequest = useAtomValue(combinedCareSheetAtom);

  const writeCareSheetMutation = useWriteCareSheetMutation();

  // info 퍼널 데이터가 없으면 info 퍼널로 이동 (atom 초기 null hydration 대비 로컬스토리지도 확인)
  useMemo(() => {
    const stored = getStoredValue("careSheet:infoFunnel");
    if (stored === null) {
      navigate("/care-sheet/new/info");
    }
  }, [infoData, navigate]);

  const handleComplete = (funnelState: FunnelState) => {
    const diagnosisData = convertFunnelStateToDiagnosisFunnelData(funnelState);
    setDiagnosisData(diagnosisData);

    // 모든 퍼널 데이터를 합쳐서 제출 요청 생성

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

    // 타입 체크 및 에러 처리
    const validationResult = validateCareSheetData(writeCareSheetRequest);
    if (!validationResult.isValid) {
      showToast({
        data: {
          message: validationResult.message,
          type: "error",
          variant: "mobile",
        },
        autoClose: 1000,
      });
    } else {
      showToast({
        data: {
          message: validationResult.message,
          type: "error",
          variant: "mobile",
        },
        autoClose: 1000,
      });
    }

    // 제출 요청 전송
    writeCareSheetMutation.mutate(
      writeCareSheetRequest as TCareSheetWriteRequest,
      {
        onSuccess: () => {
          resetAllFunnels(); // 퍼널 상태 초기화

          // 토스트 메시지 표시
          showToast({
            data: {
              message: "기록지 작성이 완료되었습니다.",
              type: "success",
              variant: "mobile",
            },
            autoClose: 1500,
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
              variant: "mobile",
            },
            autoClose: 1000,
          });
          console.error(error);
        },
      }
    );
  };

  // photo-funnel로부터 채워진 diagnosis atom을 funnelState로 프리필하고 바로 Step4로 진입
  const initialState: FunnelState | undefined = useMemo(() => {
    // atom에서 데이터 확인 - 데이터가 있고 physical이 존재하는 경우만
    if (diagnosisData && diagnosisData.physical) {
      return {
        STEP_0: {
          isWashHelperChecked: diagnosisData.physical.assistWashing,
          isMoveHelperChecked: diagnosisData.physical.assistMovement,
          isBathHelperChecked: diagnosisData.physical.assistBathing,
          bathingDurationMinutes:
            diagnosisData.physical.bathingDurationMinutes || "",
          bathingType: diagnosisData.physical.bathingType || "",
          isBreakfastChecked: diagnosisData.physical.breakfast.provided,
          breakfastType:
            MEAL_TYPE_CODE_TO_LABEL[
              diagnosisData.physical.breakfast.entry?.mealType || ""
            ] ||
            diagnosisData.physical.breakfast.entry?.mealType ||
            "",
          breakfastAmount:
            MEAL_AMOUNT_CODE_TO_LABEL[
              diagnosisData.physical.breakfast.entry?.amount || ""
            ] ||
            diagnosisData.physical.breakfast.entry?.amount ||
            "",
          isLunchChecked: diagnosisData.physical.lunch.provided,
          lunchType:
            MEAL_TYPE_CODE_TO_LABEL[
              diagnosisData.physical.lunch.entry?.mealType || ""
            ] ||
            diagnosisData.physical.lunch.entry?.mealType ||
            "",
          lunchAmount:
            MEAL_AMOUNT_CODE_TO_LABEL[
              diagnosisData.physical.lunch.entry?.amount || ""
            ] ||
            diagnosisData.physical.lunch.entry?.amount ||
            "",
          isDinnerChecked: diagnosisData.physical.dinner.provided,
          dinnerType:
            MEAL_TYPE_CODE_TO_LABEL[
              diagnosisData.physical.dinner.entry?.mealType || ""
            ] ||
            diagnosisData.physical.dinner.entry?.mealType ||
            "",
          dinnerAmount:
            MEAL_AMOUNT_CODE_TO_LABEL[
              diagnosisData.physical.dinner.entry?.amount || ""
            ] ||
            diagnosisData.physical.dinner.entry?.amount ||
            "",
          urineCount: diagnosisData.physical.numberOfUrine,
          stoolCount: diagnosisData.physical.numberOfStool,
          physicalActivity: diagnosisData.physical.comment,
        },
        STEP_1: {
          isCognitiveHelperChecked: diagnosisData.cognitive.assistCognitiveCare,
          isCommunicationHelperChecked:
            diagnosisData.cognitive.assistCommunication,
          physicalActivity: diagnosisData.cognitive.comment,
        },
        STEP_2: {
          isHealthManagementChecked: diagnosisData.healthCare.healthCare,
          isNursingManagementChecked: diagnosisData.healthCare.nursingCare,
          isEmergencyServiceChecked: diagnosisData.healthCare.emergencyService,
          systolic: diagnosisData.healthCare.bloodPressure.systolic,
          diastolic: diagnosisData.healthCare.bloodPressure.diastolic,
          temperature: diagnosisData.healthCare.temperature.temperature,
          healthManageSpecialNote: diagnosisData.healthCare.comment,
        },
        STEP_3: {
          isTrainingChecked: diagnosisData.recoveryProgram.motionTraining,
          isCognitiveActivityTrainingChecked:
            diagnosisData.recoveryProgram.cognitiveProgram,
          isCognitiveFunctionEnhancementTrainingChecked:
            diagnosisData.recoveryProgram.cognitiveEnhancement,
          isPhysicalTherapyChecked:
            diagnosisData.recoveryProgram.physicalTherapy,
          trainingSpecialNote: diagnosisData.recoveryProgram.comment,
          programEntries: diagnosisData.recoveryProgram.programEntries,
          signatureUrl: diagnosisData.signatureUrl,
        },
      } as FunnelState;
    }

    // localStorage에서도 확인 (atom 초기화 전 대비) - 데이터가 있고 physical이 존재하는 경우만
    const stored = getStoredValue<DiagnosisFunnelData>(
      "careSheet:diagnosisFunnel"
    );
    if (stored && stored.physical) {
      return {
        STEP_0: {
          isWashHelperChecked: stored.physical.assistWashing,
          isMoveHelperChecked: stored.physical.assistMovement,
          isBathHelperChecked: stored.physical.assistBathing,
          bathingDurationMinutes: stored.physical.bathingDurationMinutes || "",
          bathingType: stored.physical.bathingType || "",
          isBreakfastChecked: stored.physical.breakfast.provided,
          breakfastType:
            MEAL_TYPE_CODE_TO_LABEL[
              stored.physical.breakfast.entry?.mealType || ""
            ] ||
            stored.physical.breakfast.entry?.mealType ||
            "",
          breakfastAmount:
            MEAL_AMOUNT_CODE_TO_LABEL[
              stored.physical.breakfast.entry?.amount || ""
            ] ||
            stored.physical.breakfast.entry?.amount ||
            "",
          isLunchChecked: stored.physical.lunch.provided,
          lunchType:
            MEAL_TYPE_CODE_TO_LABEL[
              stored.physical.lunch.entry?.mealType || ""
            ] ||
            stored.physical.lunch.entry?.mealType ||
            "",
          lunchAmount:
            MEAL_AMOUNT_CODE_TO_LABEL[
              stored.physical.lunch.entry?.amount || ""
            ] ||
            stored.physical.lunch.entry?.amount ||
            "",
          isDinnerChecked: stored.physical.dinner.provided,
          dinnerType:
            MEAL_TYPE_CODE_TO_LABEL[
              stored.physical.dinner.entry?.mealType || ""
            ] ||
            stored.physical.dinner.entry?.mealType ||
            "",
          dinnerAmount:
            MEAL_AMOUNT_CODE_TO_LABEL[
              stored.physical.dinner.entry?.amount || ""
            ] ||
            stored.physical.dinner.entry?.amount ||
            "",
          urineCount: stored.physical.numberOfUrine,
          stoolCount: stored.physical.numberOfStool,
          physicalActivity: stored.physical.comment,
        },
        STEP_1: {
          isCognitiveHelperChecked: stored.cognitive.assistCognitiveCare,
          isCommunicationHelperChecked: stored.cognitive.assistCommunication,
          physicalActivity: stored.cognitive.comment,
        },
        STEP_2: {
          isHealthManagementChecked: stored.healthCare.healthCare,
          isNursingManagementChecked: stored.healthCare.nursingCare,
          isEmergencyServiceChecked: stored.healthCare.emergencyService,
          systolic: stored.healthCare.bloodPressure.systolic,
          diastolic: stored.healthCare.bloodPressure.diastolic,
          temperature: stored.healthCare.temperature.temperature,
          healthManageSpecialNote: stored.healthCare.comment,
        },
        STEP_3: {
          isTrainingChecked: stored.recoveryProgram.motionTraining,
          isCognitiveActivityTrainingChecked:
            stored.recoveryProgram.cognitiveProgram,
          isCognitiveFunctionEnhancementTrainingChecked:
            stored.recoveryProgram.cognitiveEnhancement,
          isPhysicalTherapyChecked: stored.recoveryProgram.physicalTherapy,
          trainingSpecialNote: stored.recoveryProgram.comment,
          programEntries: stored.recoveryProgram.programEntries,
          signatureUrl: stored.signatureUrl,
        },
      } as FunnelState;
    }

    return undefined;
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
