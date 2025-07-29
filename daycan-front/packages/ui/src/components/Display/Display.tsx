import type { HTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "@/utils";
import { display, type DisplayVariants } from "./Display.css";

export type DisplayProps = PropsWithChildren<
  HTMLAttributes<HTMLHeadingElement> & DisplayVariants
>;

export const Display = ({ type, color, children, ...props }: DisplayProps) => {
  return (
    <h1
      className={classNames(display({ type }))}
      style={{ color: color ? color : undefined }}
      {...props}
    >
      {children}
    </h1>
  );
};
