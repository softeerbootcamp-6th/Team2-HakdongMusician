import { useState } from "react";
import {
  convertApiToElderMember,
  convertApiToGuardian,
} from "@/utils/dataParser";
import type { MemberResponse, ElderInfo, Guardian } from "@/types/elder.ts";

export const useDataRow = ({
  apiMember,
  index,
  onDetailClick,
}: {
  apiMember: MemberResponse;
  index: number;
  onDetailClick?: (member: MemberResponse) => void;
}) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // API 데이터를 화면용 데이터로 변환
  const member: ElderInfo = convertApiToElderMember(apiMember, index);
  const guardian: Guardian = convertApiToGuardian(apiMember);

  // 데이터에서 값 가져오기
  const getFieldValue = (field: string): string => {
    const value = (member as any)[field];
    return value ? String(value) : "";
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
      }, 400);
    } else {
      // 열기 애니메이션
      setIsDetailOpen(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 400);
    }

    if (onDetailClick) {
      onDetailClick(apiMember);
    }
  };
  return {
    isDetailOpen,
    isAnimating,
    isClosing,
    member,
    guardian,
    getFieldValue,
    handleDetailClick,
  };
};
