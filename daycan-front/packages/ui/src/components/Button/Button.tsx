import type { HTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "../../utils";
import { button, type ButtonVariants } from "./Button.css";

export type ButtonProps = PropsWithChildren<
  HTMLAttributes<HTMLButtonElement> &
    ButtonVariants & {
      disabled?: boolean;
    }
>;

export const Button = ({
  variant,
  size,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        button({ variant: disabled ? "disabled" : variant, size })
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
