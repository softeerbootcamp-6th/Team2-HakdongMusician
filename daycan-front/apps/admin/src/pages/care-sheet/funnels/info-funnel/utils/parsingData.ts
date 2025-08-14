import type { FunnelState } from "@daycan/hooks";
import { formatDate } from "./formatDateTime";
import type { InfoFunnelData } from "../types/infoType";
import { mockMembers } from "../constants/dummy";

// FunnelState에서 수급자 이름을 가져오는 유틸리티 함수
export const getRecipientName = (funnelState: FunnelState): string => {
  const step0Data = funnelState.STEP_0;
  // 이거 API 기준으로 수정해야함
  if (!step0Data) return "수급자";
  if (step0Data.selectedMember?.name) return step0Data.selectedMember.name;
  if (step0Data.recipientId) {
    const found = mockMembers.find((m) => m.id === step0Data.recipientId);
    if (found?.name) return found.name;
    return step0Data.recipientId;
  }
  return "수급자";
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
    recipientId:
      step0Data?.recipientId ||
      step0Data?.selectedMember?.id ||
      "somethingWrongId",
    date: formatDate(step1Data?.date, step1Data?.isToday || false),
    startTime: step2Data?.startTime || "",
    endTime: step3Data?.endTime || "",
    mobilityNumber: step4Data?.carNumber || "", // 차량번호
  };
};
