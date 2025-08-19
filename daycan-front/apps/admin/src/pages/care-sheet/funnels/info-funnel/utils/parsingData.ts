import type { FunnelState } from "@daycan/hooks";
import type { InfoFunnelData } from "../types/infoType";

// FunnelState에서 수급자 이름을 가져오는 유틸리티 함수
export const getMemberName = (funnelState: FunnelState): string => {
  const step0Data = funnelState.STEP_0;

  // 사용자가 직접 선택한 경우 (selectedMember가 있음)
  if (step0Data?.selectedMember?.name) {
    return step0Data.selectedMember.name;
  }

  // API prefill로 받은 경우 (memberId만 있고 selectedMember는 없음)
  if (step0Data?.memberId && !step0Data?.selectedMember) {
    return `수급자 (ID: ${step0Data.memberId})`;
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
    memberId: step0Data?.recipientId || step0Data?.selectedMember?.id,
    date: step1Data?.date,
    startTime: step2Data?.startTime,
    endTime: step3Data?.endTime,
    mobilityNumber: step4Data?.carNumber,
  };
};
