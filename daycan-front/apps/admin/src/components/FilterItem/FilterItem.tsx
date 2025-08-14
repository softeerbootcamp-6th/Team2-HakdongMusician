import { Body, COLORS, Icon } from "@daycan/ui";
import { type ReactElement } from "react";
import {
  filterItemContainer,
  filterItem,
  iconWrapper,
  dropdownContainer,
  dropdown,
  dropdownItem,
} from "./FilterItem.css";

export interface FilterItemProps {
  options?: string[];
  icon?: ReactElement;
  onSelect?: (option?: string) => void;
  onClick?: () => void;
  isSelected: boolean;
  isOpen: boolean;
  displayText: string;
  onToggleDropdown: () => void;
  onOptionSelect: (option: string) => void;
}

export const FilterItem = ({
  options,
  icon,
  onClick,
  isSelected,
  isOpen,
  displayText,
  onToggleDropdown,
  onOptionSelect,
}: FilterItemProps) => {
  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleDropdown();
  };

  const handleOptionClick = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onOptionSelect(option);
  };

  return (
    <div className={filterItemContainer}>
      {/* 필터 아이템 버튼 */}
      <div className={filterItem({ isSelected })} onClick={handleToggleClick}>
        {displayText && (
          <Body
            type="xsmall"
            weight={600}
            color={isSelected ? COLORS.white : COLORS.gray[800]}
          >
            {displayText}
          </Body>
        )}

        {/* 아이콘이 있으면 생기는 아이콘 */}
        {icon && (
          <div className={iconWrapper} onClick={handleItemClick}>
            {icon}
          </div>
        )}

        {/* 옵션이 있으면 생기는 화살표 아이콘 */}
        {options && options.length > 0 && (
          <Icon
            name={isOpen ? "arrowUp" : "arrowDown"}
            color={isSelected ? COLORS.white : COLORS.gray[500]}
          />
        )}
      </div>

      {/* options 들을 다 dropdownItem으로 변환해서 렌더링 */}
      {options && options.length > 0 && isOpen && (
        <div className={dropdownContainer}>
          <div className={dropdown}>
            {options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={dropdownItem}
                onClick={(e) => handleOptionClick(option, e)}
              >
                <Body type="xsmall" weight={500} color={COLORS.gray[800]}>
                  {option}
                </Body>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
