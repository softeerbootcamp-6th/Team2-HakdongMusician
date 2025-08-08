import type { FunnelState } from "@daycan/hooks";
import { formatDate, formatTime } from "./formatDateTime";
import type { InfoFunnelData } from "../types/infoType";

// FunnelState에서 수급자 이름을 가져오는 유틸리티 함수
export const getRecipientName = (funnelState: FunnelState): string => {
  const step0Data = funnelState.STEP_0;
  return step0Data?.selectedMember?.name || "수급자";
};

// FunnelState에서 API 스펙에 맞는 데이터로 변환하는 함수
export const convertFunnelStateToInfoFunnelData = (
  funnelState: FunnelState
): InfoFunnelData => {
  const step0Data = funnelState.STEP_0;
  const step1Data = funnelState.STEP_1;
  const step2Data = funnelState.STEP_2;
  const step3Data = funnelState.STEP_3;
  const step4Data = funnelState.STEP_4;

  return {
    recipientId: step0Data?.selectedMember?.id || "somethingWrongId", // 멤버 ID 또는 기본값
    date: formatDate(step1Data?.selectedDate, step1Data?.isToday || false),
    startTime: formatTime(step2Data), // 오신 시간
    endTime: formatTime(step3Data), // 가신 시간
    mobilityNumber: step4Data?.carNumber || "", // 차량번호
  };
};
