import type { HTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "../../utils";
import { button, type ButtonVariants } from "./Button.css";
import { CustomWidthHeightType } from "@/utils";

export type ButtonProps = PropsWithChildren<
  HTMLAttributes<HTMLButtonElement> & ButtonVariants & CustomWidthHeightType
>;

export const Button = ({
  variant,
  size,

  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(button({ variant, size }))}
      style={{ width: props.customWidth, height: props.customHeight }}
      {...props}
    >
      {children}
    </button>
  );
};
