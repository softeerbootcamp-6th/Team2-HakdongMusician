import type { HTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "@/utils";
import { heading, type HeadingVariants } from "./Heading.css";

export type HeadingProps = PropsWithChildren<
  HTMLAttributes<HTMLHeadingElement> &
    HeadingVariants & {
      color?: string;
    }
>;

export const Heading: React.FC<HeadingProps> = ({
  type,
  color,
  children,
  ...props
}) => {
  return (
    <h1
      className={classNames(heading({ type }))}
      style={{ color: color ? color : undefined }}
      {...props}
    >
      {children}
    </h1>
  );
};
