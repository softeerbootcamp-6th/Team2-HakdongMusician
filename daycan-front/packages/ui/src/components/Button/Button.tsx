import type { HTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "../../utils";
import { button, type ButtonVariants } from "./Button.css";

export type ButtonProps = PropsWithChildren<
  HTMLAttributes<HTMLButtonElement> & ButtonVariants
>;

export const Button = ({
  variant,
  size,

  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={classNames(button({ variant, size }))} 
    {...props}>
      {children}
    </button>
  );
};
