import React, { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { segmentItem, type SegmentItemVariants } from "./SegmentItem.css";

export type SegmentItemProps = HTMLAttributes<HTMLDivElement> &
  SegmentItemVariants;

/**
 * @param selected - 현재 선택된 상태
 * @returns SegmentItem 컴포넌트
 */

export const SegmentItem = ({
  children,
  selected,
  type,
  flexRule,
  fontSize,
  onClick,
  ...props
}: SegmentItemProps) => {
  return (
    <div
      className={classNames(
        segmentItem({ selected, type, flexRule, fontSize })
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
