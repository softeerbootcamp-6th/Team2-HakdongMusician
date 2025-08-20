import { useEffect, useRef, useState } from "react";
import {
  timeSelect,
  timeSelectButton,
  timeSelectIcon,
  timeSelectOption,
  timeSelectPanel,
  timeSelectOptionSeparator,
} from "./CustomTimeSelect.css";
import { Body, COLORS, Icon } from "@daycan/ui";

export interface TimeOption {
  value: string;
  label: string;
}

export const CustomTimeSelect = ({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: TimeOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={timeSelect} ref={dropdownRef}>
      <div className={timeSelectButton} onClick={handleToggle}>
        <Body type="medium" weight={500} color={COLORS.gray[900]}>
          {displayText}
        </Body>
        <Icon
          name="arrowDown"
          width={16}
          height={16}
          color="transparent"
          stroke={COLORS.gray[500]}
          className={timeSelectIcon}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </div>

      {isOpen && (
        <div className={timeSelectPanel}>
          {options.map((option) => (
            <>
              <div
                key={option.value}
                className={timeSelectOption({
                  isSelected: option.value === value,
                })}
                onClick={() => handleOptionSelect(option.value)}
              >
                <Body type="medium" weight={500}>
                  {option.label}
                </Body>
              </div>
              <div className={timeSelectOptionSeparator} />
            </>
          ))}
        </div>
      )}
    </div>
  );
};
