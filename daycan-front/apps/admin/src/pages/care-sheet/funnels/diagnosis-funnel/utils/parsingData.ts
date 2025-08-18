import type { FunnelState } from "@daycan/hooks";
import {
  DIAGNOSIS_CONSTANTS,
  MEAL_TYPE_CODE_TO_LABEL,
  MEAL_AMOUNT_CODE_TO_LABEL,
} from "../constants/diagnosis";
import type { DiagnosisFunnelData } from "../types/diagnosisType";

export interface DiagnosisSummaryItem {
  label: string;
  value: string;
}

export interface DiagnosisSummarySection {
  title: string;
  items: DiagnosisSummaryItem[];
}

const yesNo = (flag?: boolean) => (flag ? "예" : "아니오");

// 코드값 → 한글 라벨 매핑
const mealTypeLabel = MEAL_TYPE_CODE_TO_LABEL;
const mealAmountLabel = MEAL_AMOUNT_CODE_TO_LABEL;

const toMealLabel = (type?: string, amount?: string) => {
  const t = type ? (mealTypeLabel[type] ?? type) : "-";
  const a = amount ? (mealAmountLabel[amount] ?? amount) : "-";
  return `${t} / ${a}`;
};

export const convertFunnelStateToDiagnosisSummary = (
  funnelState: FunnelState
): DiagnosisSummarySection[] => {
  const s0 = funnelState.STEP_0 || {};
  const s1 = funnelState.STEP_1 || {};
  const s2 = funnelState.STEP_2 || {};
  const s3 = funnelState.STEP_3 || {};

  const physicalActivity: DiagnosisSummarySection = {
    title: "신체 활동",
    items: [
      { label: "세면·구강청결 도움", value: yesNo(s0.isWashHelperChecked) },
      { label: "이동 도움", value: yesNo(s0.isMoveHelperChecked) },
      { label: "목욕 도움", value: yesNo(s0.isBathHelperChecked) },
      {
        label: "목욕 방식",
        value: s0.isBathHelperChecked ? s0.bathingType : "-",
      },
      {
        label: "목욕 시간",
        value: s0.isBathHelperChecked ? s0.bathingDurationMinutes : "-",
      },
      {
        label: "아침 식사",
        value: s0.isBreakfastChecked
          ? toMealLabel(s0.breakfastType, s0.breakfastAmount)
          : "미진행",
      },
      {
        label: "점심 식사",
        value: s0.isLunchChecked
          ? toMealLabel(s0.lunchType, s0.lunchAmount)
          : "미진행",
      },
      {
        label: "저녁 식사",
        value: s0.isDinnerChecked
          ? toMealLabel(s0.dinnerType, s0.dinnerAmount)
          : "미진행",
      },
      {
        label: "소변 횟수",
        value: s0.urineCount != null ? `${s0.urineCount}회` : "-",
      },
      {
        label: "대변 횟수",
        value: s0.stoolCount != null ? `${s0.stoolCount}회` : "-",
      },
      { label: "특이사항(신체활동)", value: s0.physicalActivity || "-" },
    ],
  };

  const cognitive: DiagnosisSummarySection = {
    title: "인지 활동",
    items: [
      { label: "인지 관리 도움", value: yesNo(s1.isCognitiveHelperChecked) },
      { label: "의사소통 도움", value: yesNo(s1.isCommunicationHelperChecked) },
      { label: "특이사항", value: s1.physicalActivity || "-" },
    ],
  };

  const health: DiagnosisSummarySection = {
    title: "건강관리",
    items: [
      { label: "건강 관리", value: yesNo(s2.isHealthManagementChecked) },
      { label: "간호 관리", value: yesNo(s2.isNursingManagementChecked) },
      { label: "응급 서비스", value: yesNo(s2.isEmergencyServiceChecked) },
      {
        label: "혈압",
        value:
          s2.systolic != null && s2.diastolic != null
            ? `${s2.systolic} / ${s2.diastolic} mmHg`
            : "-",
      },
      {
        label: "체온",
        value: s2.temperature != null ? `${s2.temperature} ℃` : "-",
      },
      { label: "특이사항(건강관리)", value: s2.healthManageSpecialNote || "-" },
    ],
  };

  const training: DiagnosisSummarySection = {
    title: "기능회복 훈련",
    items: [
      { label: "동작훈련", value: yesNo(s3.isTrainingChecked) },
      {
        label: "인지활동 훈련",
        value: yesNo(s3.isCognitiveActivityTrainingChecked),
      },
      {
        label: "인지기능향상 훈련",
        value: yesNo(s3.isCognitiveFunctionEnhancementTrainingChecked),
      },
      { label: "물리(작업) 치료", value: yesNo(s3.isPhysicalTherapyChecked) },
      // 프로그램 상세 항목 요약
      ...((s3.programEntries as any[]) || [])
        .filter((e) => e && typeof e.name === "string" && e.name.trim() !== "")
        .map((entry: any, idx: number) => {
          // 프로그램 타입 라벨 (신체, 인지)
          const typeLabel =
            DIAGNOSIS_CONSTANTS.PROGRAM.TYPE_LABEL[
              entry.type as keyof typeof DIAGNOSIS_CONSTANTS.PROGRAM.TYPE_LABEL
            ] || entry.type;
          // 프로그램 참여도 라벨 (상, 중, 하)
          const scoreLabel =
            DIAGNOSIS_CONSTANTS.PROGRAM.SCORE_LABEL[
              entry.score as keyof typeof DIAGNOSIS_CONSTANTS.PROGRAM.SCORE_LABEL
            ] || entry.score;
          return {
            label: `프로그램 ${idx + 1}`,
            value: `${typeLabel} / ${entry.name} / 참여도: ${scoreLabel}`,
          } as DiagnosisSummaryItem;
        }),
      { label: "특이사항(훈련)", value: s3.trainingSpecialNote || "-" },
    ],
  };

  return [physicalActivity, cognitive, health, training];
};

// FunnelState를 DiagnosisFunnelData로 변환
export const convertFunnelStateToDiagnosisFunnelData = (
  funnelState: FunnelState
): DiagnosisFunnelData => {
  const s0 = funnelState.STEP_0 || {};
  const s1 = funnelState.STEP_1 || {};
  const s2 = funnelState.STEP_2 || {};
  const s3 = funnelState.STEP_3 || {};

  return {
    physical: {
      assistWashing: !!s0.isWashHelperChecked,
      assistMovement: !!s0.isMoveHelperChecked,
      assistBathing: !!s0.isBathHelperChecked,
      bathingDurationMinutes: s0.bathingDurationMinutes || "",
      bathingType: s0.bathingType || "",
      breakfast: {
        provided: !!s0.isBreakfastChecked,
        entry: {
          mealType: (s0.breakfastType as any) || "REGULAR",
          amount: (s0.breakfastAmount as any) || "FULL",
        },
        validProvidedEntry: !!(
          s0.isBreakfastChecked &&
          s0.breakfastType &&
          s0.breakfastAmount
        ),
      },
      lunch: {
        provided: !!s0.isLunchChecked,
        entry: {
          mealType: (s0.lunchType as any) || "REGULAR",
          amount: (s0.lunchAmount as any) || "FULL",
        },
        validProvidedEntry: !!(
          s0.isLunchChecked &&
          s0.lunchType &&
          s0.lunchAmount
        ),
      },
      dinner: {
        provided: !!s0.isDinnerChecked,
        entry: {
          mealType: (s0.dinnerType as any) || "REGULAR",
          amount: (s0.dinnerAmount as any) || "FULL",
        },
        validProvidedEntry: !!(
          s0.isDinnerChecked &&
          s0.dinnerType &&
          s0.dinnerAmount
        ),
      },
      numberOfStool: typeof s0.stoolCount === "number" ? s0.stoolCount : 0,
      numberOfUrine: typeof s0.urineCount === "number" ? s0.urineCount : 0,
      comment: s0.physicalActivity || "",
    },
    cognitive: {
      assistCognitiveCare: !!s1.isCognitiveHelperChecked,
      assistCommunication: !!s1.isCommunicationHelperChecked,
      comment: s1.physicalActivity || "",
    },
    healthCare: {
      healthCare: !!s2.isHealthManagementChecked,
      nursingCare: !!s2.isNursingManagementChecked,
      emergencyService: !!s2.isEmergencyServiceChecked,
      bloodPressure: {
        systolic: typeof s2.systolic === "number" ? s2.systolic : 0,
        diastolic: typeof s2.diastolic === "number" ? s2.diastolic : 0,
      },
      temperature: typeof s2.temperature === "number" ? s2.temperature : 0,
      comment: s2.healthManageSpecialNote || "",
    },
    recoveryProgram: {
      motionTraining: !!s3.isTrainingChecked,
      cognitiveProgram: !!s3.isCognitiveActivityTrainingChecked,
      cognitiveEnhancement: !!s3.isCognitiveFunctionEnhancementTrainingChecked,
      physicalTherapy: !!s3.isPhysicalTherapyChecked,
      programEntries: (s3.programEntries as any[]) || [],
      comment: s3.trainingSpecialNote || "",
    },
  };
};
