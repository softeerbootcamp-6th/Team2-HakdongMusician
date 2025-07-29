import React, { PropsWithChildren, HTMLAttributes } from 'react';
import { classNames } from "@/utils";
import { chip, type ChipVariants } from "./Chip.css";

export type ChipProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & 
  ChipVariants & {
    rightIcon?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  }
>;

export const Chip = ({
  onClick,
  children,
  rightIcon,
  color,
  size,
  padding,
  ...props
}: ChipProps) => {

  return (
    <div
      className={classNames(
        chip({ 
          color, 
          size, 
          padding,
        }), 
      )}
      onClick={onClick}
      {...props}
    >
      {children || children}
      {/* {rightIcon && 아이콘} */}
    </div>
  );
};
