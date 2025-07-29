import React, { PropsWithChildren, HTMLAttributes } from 'react';
import { classNames } from "@/utils";
import { chip, type ChipVariants } from "./Chip.css";

export type ChipProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & 
  ChipVariants & {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  }
>;

export const Chip = ({
  onClick,
  children,
  color,
  size,
  padding,
  flexRule,
  ...props
}: ChipProps) => {

  return (
    <div
      className={classNames(
        chip({ 
          color, 
          size, 
          padding,
          flexRule
        }), 
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
