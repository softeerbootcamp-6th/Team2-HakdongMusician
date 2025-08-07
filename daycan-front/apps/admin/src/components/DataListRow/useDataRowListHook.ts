import { useState } from "react";
import {
  convertApiToElderMember,
  convertApiToGuardian,
} from "@/utils/dataParser";
import type {
  AdminMemberAndGuardianResponse,
  MemberInfo,
  GuardianInfo,
} from "@/types/member";

export const useDataListRow = ({
  apiData,
  index,
  onDetailClick,
}: {
  apiData: AdminMemberAndGuardianResponse;
  index: number;
  onDetailClick?: (member: AdminMemberAndGuardianResponse) => void;
}) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const animationDuration = 400; // 애니메이션 지속 시간 (ms)

  // API 데이터를 화면용 데이터로 변환
  const member: MemberInfo = convertApiToElderMember(apiData, index);
  const guardian: GuardianInfo = convertApiToGuardian(apiData);

  // 상세 컨테이너의 상태를 결정하는 함수
  const getDetailContainerState = (): "default" | "open" | "closed" => {
    if (isClosing) return "closed";
    if (isDetailOpen) return "open";
    return "default";
  };

  const handleDetailClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (isDetailOpen) {
      // 닫기 애니메이션 시작
      setIsClosing(true);
      setTimeout(() => {
        setIsDetailOpen(false);
        setIsClosing(false);
        setIsAnimating(false);
      }, animationDuration);
    } else {
      // 열기 애니메이션
      setIsDetailOpen(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, animationDuration);
    }

    if (onDetailClick) {
      onDetailClick(apiData);
    }
  };
  return {
    isDetailOpen,
    isAnimating,
    isClosing,
    member,
    guardian,
    handleDetailClick,
    getDetailContainerState,
  };
};
