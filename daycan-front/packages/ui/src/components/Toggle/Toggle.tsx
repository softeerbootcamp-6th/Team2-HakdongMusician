import type { HTMLAttributes } from "react";
import { classNames } from "../../utils";
import {
  toggle,
  toggleContainer,
  toggleSlider,
  toggleSliderChecked,
} from "./Toggle.css";

export interface ToggleProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const Toggle = ({
  checked,
  onChange,
  disabled = false,
  className,
  ...props
}: ToggleProps) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className={classNames(toggleContainer, className)}>
      <button
        type="button"
        className={classNames(toggle({ checked }))}
        onClick={handleClick}
        disabled={disabled}
        aria-checked={checked}
        role="switch"
        {...props}
      >
        <div
          className={classNames(
            toggleSlider,
            checked ? toggleSliderChecked : undefined,
          )}
        />
      </button>
    </div>
  );
};
