import type { HomeFunnelData } from "../home-funnel/types/homeType";
import type { InfoFunnelData } from "../info-funnel/types/infoType";
import type { CareSheetData } from "../types/careSheetType";

// 두 퍼널의 데이터를 합치는 함수
export const combineFunnelData = (
  homeData: HomeFunnelData | null,
  infoData: InfoFunnelData | null
): Partial<CareSheetData> | null => {
  if (!homeData || !infoData) return null;

  return {
    writerId: homeData.writerId,
    recipientId: infoData.recipientId,
    date: infoData.date,
    startTime: infoData.startTime,
    endTime: infoData.endTime,
    mobilityNumber: infoData.mobilityNumber,
  };
};
