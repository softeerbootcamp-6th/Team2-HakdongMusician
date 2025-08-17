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
    SCORES: ["LOW", "MEDIUM", "HIGH"] as const,
    TYPE_LABEL: {
      PHYSICAL: "신체",
      COGNITIVE: "인지",
    } as const,
    SCORE_LABEL: {
      HIGH: "상",
      MEDIUM: "중",
      LOW: "하",
    } as const,
  },
} as const;

export type ProgramType = (typeof DIAGNOSIS_CONSTANTS.PROGRAM.TYPES)[number];
export type Score = (typeof DIAGNOSIS_CONSTANTS.PROGRAM.SCORES)[number];

// 식사 코드/라벨 매핑 (UI ↔ API 변환용)
export const MEAL_TYPE_CODE_TO_LABEL: Record<string, string> = {
  REGULAR: "일반식",
  PORRIDGE: "죽",
  RICE_WATER: "유동식",
};

export const MEAL_TYPE_LABEL_TO_CODE: Record<string, string> = {
  일반식: "REGULAR",
  죽: "PORRIDGE",
  유동식: "RICE_WATER",
};

export const MEAL_AMOUNT_CODE_TO_LABEL: Record<string, string> = {
  FULL: "1인분",
  MORE_HALF: "1/2이상",
  LESS_HALF: "1/3이하",
};

export const MEAL_AMOUNT_LABEL_TO_CODE: Record<string, string> = {
  "1인분": "FULL",
  "1/2이상": "MORE_HALF",
  "1/3이하": "LESS_HALF",
};
