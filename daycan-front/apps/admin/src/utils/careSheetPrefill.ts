import type { HomeFunnelData } from "@/pages/care-sheet/funnels/home-funnel/types/homeType";
import type { DiagnosisFunnelData } from "@/pages/care-sheet/funnels/diagnosis-funnel/types/diagnosisType";
import type { InfoFunnelData } from "@/pages/care-sheet/funnels/info-funnel/types/infoType";
import type { TCareSheetReadResponse } from "@/services/careSheet/types";

/**
 * OCR 이나, 케어시트 데이터를 기반으로 care-sheet 폼에 기본값을 설정하는 함수
 * @param careSheetDetail - 케어시트 상세 데이터
 * @param setHomeFunnelData - home funnel 데이터 설정 함수
 * @param setInfoFunnelData - info funnel 데이터 설정 함수
 * @param setDiagnosisFunnelData - diagnosis funnel 데이터 설정 함수
 */
export const prefillCareSheetData = (
  careSheetDetail: TCareSheetReadResponse,
  setHomeFunnelData: (data: HomeFunnelData) => void,
  setInfoFunnelData: (data: InfoFunnelData) => void,
  setDiagnosisFunnelData: (data: DiagnosisFunnelData) => void
) => {
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
