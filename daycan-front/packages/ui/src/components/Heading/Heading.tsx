import type { HTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "@/utils";
import { heading, type HeadingVariants } from "./Heading.css";

export type HeadingProps = PropsWithChildren<
  HTMLAttributes<HTMLHeadingElement> & HeadingVariants
>;

export const Heading = ({ type, children, ...props }: HeadingProps) => {
  return (
    <h1 className={classNames(heading({ type }))} {...props}>
      {children}
    </h1>
  );
};
