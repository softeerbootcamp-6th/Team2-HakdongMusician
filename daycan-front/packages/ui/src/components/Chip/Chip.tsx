import React, { PropsWithChildren, HTMLAttributes } from 'react';
import { classNames } from "@/utils";
import { chip, type ChipVariants } from "./Chip.css";
import { CustomWidthHeightType } from "@/utils";

export type ChipProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & 
  ChipVariants & CustomWidthHeightType & {
    backgroundColor?: string;
  }
>;

export const Chip = ({
  onClick,
  children,
  size,
  padding,
  flexRule,
  backgroundColor,
  selected,
  ...props
}: ChipProps) => {

  return (
    <div
      className={classNames(
        chip({ 
          size, 
          padding,
          flexRule,
          selected,
        }), 
      )}
      style={{ backgroundColor, width: props.customWidth, height: props.customHeight }}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
