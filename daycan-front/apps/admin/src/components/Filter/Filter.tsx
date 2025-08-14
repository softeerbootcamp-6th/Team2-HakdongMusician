import { forwardRef, type ReactElement, useEffect } from "react";
import { filter } from "./Filter.css";
import { useFilter } from "./useFilter";
import { FilterItem } from "../FilterItem";

export interface FilterItem {
  text?: string;
  options?: string[];
  icon?: ReactElement;
  onSelect?: (option?: string) => void;
  onClick?: () => void;
}

interface FilterProps {
  items: FilterItem[];
  resetKey?: string | number; // reset 신호를 위한 key
}

export const Filter = forwardRef<HTMLDivElement, FilterProps>(
  ({ items, resetKey }, ref) => {
    const {
      openDropdownIndex,
      handleToggleDropdown,
      handleOptionSelect,
      resetFilter,
      getDisplayText,
      isItemSelected,
    } = useFilter();

    // resetKey가 변경되면 내부 상태 초기화
    useEffect(() => {
      resetFilter();
    }, [resetKey]);

    return (
      <div className={filter} ref={ref}>
        {/* 필터 아이템 버튼들을 렌더링 */}
        {items.map((item, index) => {
          const displayText = getDisplayText(item.text, item.options, index);
          const isSelected = isItemSelected(index);
          const isOpen = openDropdownIndex === index;

          return (
            <FilterItem
              key={index}
              options={item.options}
              icon={item.icon}
              onClick={item.onClick}
              isSelected={isSelected}
              isOpen={isOpen}
              displayText={displayText || ""}
              onToggleDropdown={() => handleToggleDropdown(index)}
              onOptionSelect={(option) =>
                handleOptionSelect(index, option, item.onSelect)
              }
            />
          );
        })}
      </div>
    );
  }
);

Filter.displayName = "Filter";
