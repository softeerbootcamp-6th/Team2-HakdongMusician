import type { HTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "../../utils";
import { body, type BodyVariants } from "./Body.css";

export type BodyProps = PropsWithChildren<
  HTMLAttributes<HTMLParagraphElement> &
    BodyVariants & {
      color?: string;
    }
>;

export const Body: React.FC<BodyProps> = ({
  type,
  weight,
  color,
  children,
  ...props
}) => {
  return (
    <p
      className={classNames(body({ type, weight }))}
      style={{ color: color ? color : undefined }}
      {...props}
    >
      {children}
    </p>
  );
};
