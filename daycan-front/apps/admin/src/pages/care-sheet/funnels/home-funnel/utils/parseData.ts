import type { FunnelState } from "@daycan/hooks";
import type { HomeFunnelData } from "../types/homeType";
import type { TStaff, TStaffRole } from "@/services/staff/types";

// FunnelState에서 작성자 이름을 가져오는 유틸리티 함수
export const getStaffName = (funnelState: FunnelState): string => {
  const step0Data = funnelState.STEP_0;
  const selectedStaff: TStaff = step0Data?.selectedStaff;
  return selectedStaff?.name || "작성자";
};

export const getStaffRole = (staffRole: TStaffRole): string => {
  switch (staffRole) {
    case "DIRECTOR":
      return "센터장";
    case "SOCIAL_WORKER":
      return "사회복지사";
    case "CAREGIVER":
      return "요양보호사";
    default:
      return "직원";
  }
};

// FunnelState에서 home-funnel 데이터로 변환하는 함수
export const convertFunnelStateToHomeFunnelData = (
  funnelState: FunnelState
): HomeFunnelData => {
  const step0Data = funnelState.STEP_0;
  const selectedStaff: TStaff = step0Data?.selectedStaff;

  return {
    writerId: selectedStaff?.staffId,
  };
};
