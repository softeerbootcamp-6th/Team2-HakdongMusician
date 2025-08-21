import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "../../utils";
import { button, type ButtonVariants } from "./Button.css";

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> &
    ButtonVariants & {
      disabled?: boolean;
    }
>;

export const Button = ({
  variant,
  size,
  children,
  disabled,
  flexRule,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        button({
          variant: disabled ? "disabled" : variant,
          size,
          flexRule,
        })
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
