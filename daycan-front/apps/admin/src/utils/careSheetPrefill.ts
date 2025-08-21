import { homeFunnelDataAtom } from "@/pages/care-sheet/funnels/home-funnel/atoms/homeAtom";
import type { HomeFunnelData } from "@/pages/care-sheet/funnels/home-funnel/types/homeType";
import { diagnosisFunnelDataAtom } from "@/pages/care-sheet/funnels/diagnosis-funnel/atoms/diagnosisAtom";
import type { DiagnosisFunnelData } from "@/pages/care-sheet/funnels/diagnosis-funnel/types/diagnosisType";
import { infoFunnelDataAtom } from "@/pages/care-sheet/funnels/info-funnel/atoms/infoAtom";
import type { InfoFunnelData } from "@/pages/care-sheet/funnels/info-funnel/types/infoType";
import type { TCareSheetReadResponse } from "@/services/careSheet/types";
import { useSetAtom } from "jotai";

/**
 * OCR 데이터를 기반으로 care-sheet 폼에 기본값을 설정하는 함수
 * @param setInfoFunnelData - info funnel 데이터 설정 함수
 * @param setDiagnosisFunnelData - diagnosis funnel 데이터 설정 함수
 * @param ocrData - OCR로부터 추출된 데이터 (옵션, 추후 확장 가능)
 */
export const prefillCareSheetData = (
  careSheetDetail: TCareSheetReadResponse
) => {
  const setHomeFunnelData = useSetAtom(homeFunnelDataAtom);
  const setInfoFunnelData = useSetAtom(infoFunnelDataAtom);
  const setDiagnosisFunnelData = useSetAtom(diagnosisFunnelDataAtom);

  const tempHomeFunnelData: HomeFunnelData = {
    writerId: careSheetDetail.writerId,
  };

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
  // home-funnel 기본 데이터 설정
  setHomeFunnelData(tempHomeFunnelData);

  // info-funnel 기본 데이터 설정
  setInfoFunnelData(tempInfoFunnelData);

  // diagnosis-funnel 기본 데이터 설정
  setDiagnosisFunnelData(tempDiagnosisFunnelData);
};
