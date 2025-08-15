import { useState, useRef, useEffect } from "react";
import { Body, COLORS, Icon } from "@daycan/ui";
import {
  dropDownContainer,
  dropDownButton,
  dropDownPanel,
  dropDownOption,
  dropDownIcon,
} from "./CareLevelRoleDropDownSelector.css";

export interface CareLevelRoleDropDownSelectorProps {
  options: { value: number | string; label: string }[];
  value?: number | string;
  placeholder?: string;
  onChange: (value: number | string) => void;
  disabled?: boolean;
  label?: string;
  hideLabel?: boolean;
}

export const CareLevelRoleDropDownSelector = ({
  options,
  value,
  placeholder = "선택해주세요",
  onChange,
  disabled = false,
  label,
  hideLabel = false,
}: CareLevelRoleDropDownSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionSelect = (optionValue: number | string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={dropDownContainer} ref={dropdownRef}>
      {!hideLabel && label && (
        <div style={{ marginBottom: "8px" }}>
          <Body weight={600} type="large" style={{ color: COLORS.gray[700] }}>
            {label}
          </Body>
        </div>
      )}
      <div className={dropDownButton} onClick={handleToggle}>
        <Body
          type="large"
          weight={500}
          color={
            displayText !== placeholder ? COLORS.gray[900] : COLORS.gray[500]
          }
        >
          {displayText}
        </Body>
        <Icon
          name="arrowDown"
          width={20}
          height={20}
          color={"transparent"}
          stroke={COLORS.gray[500]}
          className={dropDownIcon}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </div>

      {isOpen && (
        <div className={dropDownPanel}>
          {options.map((option, index) => (
            <div key={option.value}>
              <div
                className={dropDownOption({
                  isSelected: option.value === value,
                })}
                onClick={() => handleOptionSelect(option.value)}
              >
                <Body>{option.label}</Body>
              </div>
              {index < options.length - 1 && (
                <div
                  style={{
                    height: "1px",
                    backgroundColor: COLORS.gray[100],
                    margin: "0 8px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
