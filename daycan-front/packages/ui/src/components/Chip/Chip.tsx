import React, { PropsWithChildren, HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { chip, type ChipVariants } from "./Chip.css";
import { CustomWidthHeightType } from "@/utils";

export type ChipProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & ChipVariants & CustomWidthHeightType
>;

export const Chip = ({
  onClick,
  children,
  flexRule,
  round,
  ...props
}: ChipProps) => {
  return (
    <div
      className={classNames(chip({ flexRule, round }))}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
