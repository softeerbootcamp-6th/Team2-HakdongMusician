import type { HomeFunnelData } from "../home-funnel/types/homeType";
import type { InfoFunnelData } from "../info-funnel/types/infoType";
import type { DiagnosisFunnelData } from "../diagnosis-funnel/types/diagnosisType";
import type { TCareSheetWriteRequest } from "@/services/careSheet/types";

// 두 퍼널의 데이터를 합치는 함수
export const combineFunnelData = (
  homeData: HomeFunnelData | null,
  infoData: InfoFunnelData | null,
  diagnosisData: DiagnosisFunnelData | null
): Partial<TCareSheetWriteRequest> | null => {
  if (!homeData || !infoData || !diagnosisData) return null;

  return {
    writerId: homeData.writerId,
    memberId: infoData.memberId,
    date: infoData.date,
    startTime: infoData.startTime,
    endTime: infoData.endTime,
    mobilityNumber: infoData.mobilityNumber,
    physical: diagnosisData.physical,
    cognitive: diagnosisData.cognitive,
    healthCare: diagnosisData.healthCare,
    recoveryProgram: diagnosisData.recoveryProgram,
  };
};
