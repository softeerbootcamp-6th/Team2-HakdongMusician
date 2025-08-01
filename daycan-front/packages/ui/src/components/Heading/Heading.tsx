import type { HTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "@/utils";
import { heading, type HeadingVariants } from "./Heading.css";

export type HeadingProps = PropsWithChildren<
  HTMLAttributes<HTMLHeadingElement> & HeadingVariants
>;

export const Heading = ({ type, children, color, ...props }: HeadingProps) => {
  return (
    <h1 className={classNames(heading({ type }))} 
        style={{ color: color ? color : undefined }}
    {...props}>
      {children}
    </h1>
  );
};
