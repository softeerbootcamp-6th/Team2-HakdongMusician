import { useState, useMemo, useEffect } from "react";
import type { CareSheetListItemType } from "../constants/dummy";

interface UseCareSheetProps {
  careSheets: CareSheetListItemType;
  status: "NOT_APPLICABLE" | "APPLICABLE";
}

export const useCareSheet = ({ careSheets, status }: UseCareSheetProps) => {
  // 마감까지 남은 시간 상태
  const [timeLeft, setTimeLeft] = useState<string>("");
  const PM_17 = 19 * 60 * 60 * 1000;

  // 마감까지 남은 시간 계산 (오후 7시 = 19시)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const deadline = new Date(today.getTime() + PM_17);

      // 이미 마감된 경우
      if (now >= deadline) {
        setTimeLeft("마감되었습니다");
        return;
      }

      const diff = deadline.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours > 0) {
        setTimeLeft(`마감까지 ${hours}시간 ${minutes}분 남았어요`);
      } else if (minutes > 0) {
        setTimeLeft(`마감까지 ${minutes}분 남았어요`);
      } else {
        setTimeLeft("마감까지 1분 미만 남았어요");
      }
    };

    // 초기 계산
    calculateTimeLeft();

    // 1분마다 업데이트
    const interval = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(interval);
  }, [PM_17]);

  // 작성 필요와 작성 완료 상태만 필터링
  const filteredCareSheets = useMemo(() => {
    let result = [];
    if (status === "APPLICABLE") {
      result = careSheets.result.filter(
        (item) => item.status === "SHEET_PENDING" || "SHEET_DONE"
      );
      result.sort((a, b) => {
        if (a.status === "SHEET_PENDING" && b.status === "SHEET_DONE")
          return -1;
        if (a.status === "SHEET_DONE" && b.status === "SHEET_PENDING") return 1;
        return 0;
      });
    } else {
      result = careSheets.result.filter(
        (item) => item.status === "NOT_APPLICABLE"
      );
    }
    return result;
  }, [careSheets, status]);

  // 체크 가능한 항목들만 필터링 (작성 완료 제외)
  const checkableCareSheets = useMemo(() => {
    return filteredCareSheets.filter((item) => item.status !== "SHEET_DONE");
  }, [filteredCareSheets]);

  // 체크된 항목들 관리
  const [isCheckedItems, setIsCheckedItems] = useState<Set<number>>(new Set());

  // 전체 선택/해제 처리 (체크 가능한 항목만)
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(
        checkableCareSheets.map((item) => item.careSheetId)
      );
      setIsCheckedItems(allIds);
    } else {
      setIsCheckedItems(new Set());
    }
  };

  // 개별 항목 체크/해제 처리
  const handleItemCheck = (careSheetId: number, checked: boolean) => {
    const newCheckedItems = new Set(isCheckedItems);
    if (checked) {
      newCheckedItems.add(careSheetId);
    } else {
      newCheckedItems.delete(careSheetId);
    }
    setIsCheckedItems(newCheckedItems);
  };

  // 전체 선택 여부 계산 (체크 가능한 항목만)
  const isAllSelected = useMemo(() => {
    return (
      checkableCareSheets.length > 0 &&
      checkableCareSheets.every((item) => isCheckedItems.has(item.careSheetId))
    );
  }, [checkableCareSheets, isCheckedItems]);

  // 부분 선택 여부 계산 (체크 가능한 항목만)
  const isIndeterminate = useMemo(() => {
    return (
      isCheckedItems.size > 0 &&
      isCheckedItems.size < checkableCareSheets.length
    );
  }, [isCheckedItems, checkableCareSheets]);

  // 체크된 ID들을 배열로 반환
  const getCheckedIds = () => Array.from(isCheckedItems);

  // 체크된 항목이 있는지 확인
  const hasCheckedItems = isCheckedItems.size > 0;

  return {
    // 상태
    timeLeft,
    filteredCareSheets,
    checkableCareSheets,
    isCheckedItems,

    // 계산된 값
    isAllSelected,
    isIndeterminate,
    hasCheckedItems,

    // 액션
    handleSelectAll,
    handleItemCheck,
    getCheckedIds,
  };
};
