import { atom } from "jotai";

// 최종 API 스펙에 맞는 전체 케어시트 데이터 타입
export interface CareSheetData {
  writerId: number;
  // ------- home-funnel에서 관리하는 데이터 타입 끝 -------
  recipientId: string;
  date: string; // "2025-08-01" 형식
  startTime: string; // "09:00" 형식
  endTime: string; // "17:00" 형식
  mobilityNumber: string; // "123가 4567" 형식
  //------- info-funnel에서 관리하는 데이터 타입 끝 -------

  physical: {
    assistWashing: boolean;
    assistMovement: boolean;
    assistBathing: boolean;
    breakfast: {
      provided: boolean;
      entry: {
        mealType: "REGULAR" | "SOFT" | "LIQUID";
        amount: "FULL" | "HALF" | "QUARTER";
      };
      validProvidedEntry: boolean;
    };
    lunch: {
      provided: boolean;
      entry: {
        mealType: "REGULAR" | "SOFT" | "LIQUID";
        amount: "FULL" | "HALF" | "QUARTER";
      };
      validProvidedEntry: boolean;
    };
    dinner: {
      provided: boolean;
      entry: {
        mealType: "REGULAR" | "SOFT" | "LIQUID";
        amount: "FULL" | "HALF" | "QUARTER";
      };
      validProvidedEntry: boolean;
    };
    numberOfStool: number;
    numberOfUrine: number;
    note: string;
  };
  cognitive: {
    assistCognitiveCare: boolean;
    assistCommunication: boolean;
    note: string;
  };
  healthCare: {
    healthCare: boolean;
    nursingCare: boolean;
    emergencyService: boolean;
    bloodPressure: {
      systolic: number;
      diastolic: number;
    };
    temperature: number;
    note: string;
  };
  recoveryProgram: {
    motionTraining: boolean;
    cognitiveProgram: boolean;
    cognitiveEnhancement: boolean;
    physicalTherapy: boolean;
    programEntries: Array<{
      type: "PHYSICAL" | "COGNITIVE" | "SOCIAL";
      name: string;
      evaluation: "LOW" | "MEDIUM" | "HIGH";
    }>;
    note: string;
  };
  // ------- diagnosis-funnel에서 관리하는 데이터 타입 끝 -------

  signatureUrl?: string;
}

// 최종 케어시트 데이터 atom
export const careSheetDataAtom = atom<CareSheetData | null>(null);
