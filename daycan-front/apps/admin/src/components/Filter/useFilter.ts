import { useState } from "react";

export const useFilter = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const [selectedOptionsMap, setSelectedOptionsMap] = useState<
    Record<number, string[]>
  >({});

  const handleToggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleOptionSelect = (
    itemIndex: number,
    option: string,
    onSelect?: (option?: string) => void
  ) => {
    setSelectedOptionsMap((prev) => {
      const current = prev[itemIndex] || [];
      const isAlreadySelected = current.includes(option);

      if (isAlreadySelected) {
        // 이미 선택된 옵션이면 제거 (토글)
        const newSelected = current.filter((item) => item !== option);
        return {
          ...prev,
          [itemIndex]: newSelected,
        };
      } else {
        // 새로운 옵션 선택 (기존 선택 해제하고 새로 선택)
        return {
          ...prev,
          [itemIndex]: [option],
        };
      }
    });

    // onSelect 콜백 호출
    if (onSelect) {
      const current = selectedOptionsMap[itemIndex] || [];
      const isAlreadySelected = current.includes(option);

      if (isAlreadySelected) {
        // 해제된 경우 undefined 전달
        onSelect(undefined);
      } else {
        // 선택된 경우 옵션 전달
        onSelect(option);
      }
    }

    // 옵션 선택 후 드롭다운 닫기
    setOpenDropdownIndex(null);
  };

  const resetFilter = () => {
    setSelectedOptionsMap({});
    setOpenDropdownIndex(null);
  };

  const getDisplayText = (
    text: string | undefined,
    options: string[] | undefined,
    itemIndex: number
  ) => {
    if (options && options.length > 0) {
      const selected = selectedOptionsMap[itemIndex] || [];
      if (selected.length > 0) {
        return selected[0]; // 첫 번째 선택된 옵션만 반환
      }
      // text가 있으면 text를, 없으면 "옵션 선택"을 표시
      return text || "옵션 선택";
    }
    // options가 없으면 text만 표시
    return text;
  };

  const isItemSelected = (itemIndex: number) => {
    return (selectedOptionsMap[itemIndex] || []).length > 0;
  };

  return {
    openDropdownIndex,
    selectedOptionsMap,
    handleToggleDropdown,
    handleOptionSelect,
    resetFilter,
    getDisplayText,
    isItemSelected,
  };
};
