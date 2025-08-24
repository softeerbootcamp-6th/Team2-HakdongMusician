import type { FunnelState } from "@daycan/hooks";
import type { HomeFunnelData } from "../types/homeType";
import type { TStaff, TStaffRole } from "@/services/staff/types";
import type { ChipProps } from "@daycan/ui";

// FunnelState에서 작성자 이름을 가져오는 유틸리티 함수
export const getStaffName = (funnelState: FunnelState): string => {
  const step0Data = funnelState.STEP_0;
  const selectedStaff: TStaff = step0Data?.selectedStaff;
  return selectedStaff?.name || "작성자";
};

// 직원 역할 정보를 제공하는 통합 함수
export const getStaffRoleInfo = (staffRole: TStaffRole) => {
  switch (staffRole) {
    case "DIRECTOR":
      return {
        label: "센터장",
        color: "yellow" as ChipProps["color"],
      };
    case "SOCIAL_WORKER":
      return {
        label: "사회복지사",
        color: "green" as ChipProps["color"],
      };
    case "CAREGIVER":
      return {
        label: "요양보호사",
        color: "blue" as ChipProps["color"],
      };
    default:
      return {
        label: "직원",
        color: "grayLight" as ChipProps["color"],
      };
  }
};

// 기존 함수들도 유지 (하위 호환성)
export const getStaffRole = (staffRole: TStaffRole): string => {
  return getStaffRoleInfo(staffRole).label;
};

export const colorByStaffRole = (staffRole: TStaffRole): ChipProps["color"] => {
  return getStaffRoleInfo(staffRole).color;
};

// FunnelState에서 home-funnel 데이터로 변환하는 함수
export const convertFunnelStateToHomeFunnelData = (
  funnelState: FunnelState
): HomeFunnelData => {
  const step0Data = funnelState.STEP_0;

  return {
    writerId: step0Data?.writerId,
  };
};
