import type { FunnelState } from "@daycan/hooks";
import type { HomeFunnelData } from "../types/homeType";

// FunnelState에서 작성자 이름을 가져오는 유틸리티 함수
export const getWriterName = (funnelState: FunnelState): string => {
  const step0Data = funnelState.STEP_0;
  return step0Data?.selectedUser?.name || "작성자";
};

// FunnelState에서 home-funnel 데이터로 변환하는 함수
export const convertFunnelStateToHomeFunnelData = (
  funnelState: FunnelState
): HomeFunnelData => {
  const step0Data = funnelState.STEP_0;

  return {
    writerId: step0Data?.writerId || 1,
  };
};
