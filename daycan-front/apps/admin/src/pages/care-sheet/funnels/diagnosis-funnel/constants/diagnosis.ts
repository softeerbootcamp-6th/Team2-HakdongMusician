export const DIAGNOSIS_CONSTANTS = {
  //STEP_0
  MAX_URINE_COUNT: 10,
  MIN_URINE_COUNT: 0,
  MAX_STOOL_COUNT: 5,
  MIN_STOOL_COUNT: 0,
  //STEP_1
  MIN_SYSTOLIC: 80,
  MAX_SYSTOLIC: 200,
  MIN_DIASTOLIC: 60,
  MAX_DIASTOLIC: 120,
  //STEP_2
  MIN_TEMPERATURE: 34,
  MAX_TEMPERATURE: 42,
  // STEP_3 프로그램 관련 상수
  PROGRAM: {
    TYPES: ["PHYSICAL", "COGNITIVE"] as const,
    EVALUATIONS: ["LOW", "MEDIUM", "HIGH"] as const,
    TYPE_LABEL: {
      PHYSICAL: "신체",
      COGNITIVE: "인지",
    } as const,
    EVALUATION_LABEL: {
      HIGH: "상",
      MEDIUM: "중",
      LOW: "하",
    } as const,
  },
} as const;

export type ProgramType = (typeof DIAGNOSIS_CONSTANTS.PROGRAM.TYPES)[number];
export type EvaluationLevel =
  (typeof DIAGNOSIS_CONSTANTS.PROGRAM.EVALUATIONS)[number];
