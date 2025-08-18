import type {
  Amount,
  MealType,
  ProgramType,
  Score,
} from "@/services/careSheet/types";

// diagnosis-funnel에서 관리하는 데이터 타입
export interface DiagnosisFunnelData {
  physical: {
    assistWashing: boolean;
    assistMovement: boolean;
    assistBathing: boolean;
    bathingDurationMinutes: string;
    bathingType: string;
    breakfast: {
      provided: boolean;
      entry: {
        mealType: MealType;
        amount: Amount;
      };
      validProvidedEntry: boolean;
    };
    lunch: {
      provided: boolean;
      entry: {
        mealType: MealType;
        amount: Amount;
      };
      validProvidedEntry: boolean;
    };
    dinner: {
      provided: boolean;
      entry: {
        mealType: MealType;
        amount: Amount;
      };
      validProvidedEntry: boolean;
    };
    numberOfStool: number; // 대변 횟수
    numberOfUrine: number; // 소변 횟수
    comment: string; // 특이사항(신체활동)
  };
  cognitive: {
    assistCognitiveCare: boolean;
    assistCommunication: boolean;
    comment: string; // 특이사항(인지)
  };
  healthCare: {
    healthCare: boolean; // 건강 관리
    nursingCare: boolean; // 간호 관리
    emergencyService: boolean; // 응급 서비스
    bloodPressure: {
      systolic: number; // 최저
      diastolic: number; // 최고
    };
    temperature: {
      temperature: number;
    };
    comment: string; // 특이사항(건강관리)
  };
  recoveryProgram: {
    motionTraining: boolean; // 동작 훈련
    cognitiveProgram: boolean; // 인지활동 훈련
    cognitiveEnhancement: boolean; // 인지기능향상 훈련
    physicalTherapy: boolean; // 물리(작업) 치료
    programEntries: {
      type: ProgramType;
      name: string;
      score: Score;
    }[];
    comment: string; // 특이사항(훈련)
  };
}
