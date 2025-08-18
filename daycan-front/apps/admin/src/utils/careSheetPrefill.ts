import { diagnosisFunnelDataAtom } from "@/pages/care-sheet/funnels/diagnosis-funnel/atoms/diagnosisAtom";
import type { DiagnosisFunnelData } from "@/pages/care-sheet/funnels/diagnosis-funnel/types/diagnosisType";
import { infoFunnelDataAtom } from "@/pages/care-sheet/funnels/info-funnel/atoms/infoAtom";
import type { InfoFunnelData } from "@/pages/care-sheet/funnels/info-funnel/types/infoType";
import type { TCareSheetReadResponse } from "@/services/careSheet/types";
import { useSetAtom } from "jotai";
import { TODAY_DATE } from "./dateFormatter";

/**
 * OCR 데이터를 기반으로 care-sheet 폼에 기본값을 설정하는 함수
 * @param setInfoFunnelData - info funnel 데이터 설정 함수
 * @param setDiagnosisFunnelData - diagnosis funnel 데이터 설정 함수
 * @param ocrData - OCR로부터 추출된 데이터 (옵션, 추후 확장 가능)
 */
export const prefillCareSheetData = (
  careSheetDetail: TCareSheetReadResponse
) => {
  const setInfoFunnelData = useSetAtom(infoFunnelDataAtom);
  const setDiagnosisFunnelData = useSetAtom(diagnosisFunnelDataAtom);

  const tempInfoFunnelData: InfoFunnelData = {
    memberId: careSheetDetail.memberId,
    date: careSheetDetail.date,
    startTime: careSheetDetail.startTime,
    endTime: careSheetDetail.endTime,
    mobilityNumber: careSheetDetail.mobilityNumber,
  };

  const tempDiagnosisFunnelData: DiagnosisFunnelData = {
    physical: careSheetDetail.physical,
    cognitive: careSheetDetail.cognitive,
    healthCare: careSheetDetail.healthCare,
    recoveryProgram: careSheetDetail.recoveryProgram,
  };

  // info-funnel 기본 데이터 설정
  setInfoFunnelData(tempInfoFunnelData);

  // diagnosis-funnel 기본 데이터 설정
  setDiagnosisFunnelData(tempDiagnosisFunnelData);
};

/**
 * 기본 care-sheet 데이터를 생성하는 헬퍼 함수들
 * 단순히 mock 데이터를 생성하는 함수로 추후 삭제 예정
 * @author 홍규진
 */
export const getDefaultInfoData = (): InfoFunnelData => ({
  memberId: 1,
  date: TODAY_DATE,
  startTime: "09:10",
  endTime: "17:20",
  mobilityNumber: "275가 2056",
});

export const getDefaultDiagnosisData = (): DiagnosisFunnelData => ({
  physical: {
    assistWashing: true,
    assistMovement: true,
    assistBathing: false,
    bathingDurationMinutes: "10",
    bathingType: "BATH",
    breakfast: {
      provided: true,
      entry: {
        mealType: "REGULAR",
        amount: "MORE_HALF",
      },
      validProvidedEntry: false,
    },
    lunch: {
      provided: false,
      entry: {
        mealType: "REGULAR",
        amount: "FULL",
      },
      validProvidedEntry: false,
    },
    dinner: {
      provided: true,
      entry: {
        mealType: "REGULAR",
        amount: "FULL",
      },
      validProvidedEntry: false,
    },
    numberOfStool: 2,
    numberOfUrine: 3,
    comment: "오늘은 목욕을 했어요",
  },
  cognitive: {
    assistCognitiveCare: false,
    assistCommunication: true,
    comment: "인지 테스트 결과 좋음",
  },
  healthCare: {
    healthCare: false,
    nursingCare: true,
    emergencyService: true,
    bloodPressure: {
      systolic: 130,
      diastolic: 90,
    },
    temperature: {
      temperature: 36.5,
    },
    comment: "",
  },
  recoveryProgram: {
    motionTraining: true,
    cognitiveProgram: true,
    cognitiveEnhancement: true,
    physicalTherapy: true,
    programEntries: [],
    comment: "",
  },
});
