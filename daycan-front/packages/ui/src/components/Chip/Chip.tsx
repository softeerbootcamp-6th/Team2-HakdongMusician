import React, { PropsWithChildren, HTMLAttributes } from 'react';
import { classNames } from "@/utils";
import { chip, type ChipVariants } from "./Chip.css";

export type ChipProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & 
  ChipVariants & {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
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
  ...props
}: ChipProps) => {

  return (
    <div
      className={classNames(
        chip({ 
          size, 
          padding,
          flexRule
        }), 
      )}
      style={{ backgroundColor }}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
