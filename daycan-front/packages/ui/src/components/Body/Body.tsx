import type { HTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "../../utils";
import { body, type BodyVariants } from "./Body.css";

export type BodyProps = PropsWithChildren<
  //HTML에서 제공하는 P테그의 default 속성을 사용할 수 있도록 하기 위해서 사용됩니다.
  HTMLAttributes<HTMLParagraphElement> & BodyVariants
>;

export const Body = ({
  type,
  weight,
  color,
  children,
  ...props
}: BodyProps) => {
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
