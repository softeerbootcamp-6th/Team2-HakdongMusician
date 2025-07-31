import React, { PropsWithChildren, HTMLAttributes } from 'react';
import { classNames } from "@/utils";
import { segment, type SegmentVariants, segmentDivider } from "./Segment.css";
import { SegmentItem } from './SegmentItem';




export type SegmentProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & 
  SegmentVariants & {
    options: string[];
    value: string;
    onSegmentChange: (val: string) => void;
  }
>;

export const Segment = ({
  variant,
  type,
  children,
  options,
  onSegmentChange,
  value,
  ...props
}: SegmentProps) => {
  return (
    <div
      className={classNames(segment({ variant, type }))}
      {...props}
    >
      {options.map((option: string, index: number) => {
        const { isSelected, shouldShowDivider } = getSegmentItemState(
          option,
          index,
          options,
          value,
          type
        );

        return (
          <>
            <SegmentItem 
              key={option}
              type={type}
              selected={isSelected}
              onClick={() => onSegmentChange(option)}
            >
              {option}
            </SegmentItem>
            {shouldShowDivider && <div className={classNames(segmentDivider)} />}
          </>
        );
      })}
    </div>
  );
};

// 세그먼트 아이템의 상태를 계산하는 헬퍼 함수
const getSegmentItemState = (
  option: string,
  index: number,
  options: string[],
  value: string,
  type?: string
) => {
  const isSelected = value === option;
  const isNextSelected = index < options.length - 1 && value === options[index + 1];
  
  // 구분선 표시 조건들을 명확하게 분리
  const isNotLastItem = index < options.length - 1;
  const isDefaultType = type === 'default';
  const shouldHideDivider = isSelected || isNextSelected;
  const shouldShowDivider = isDefaultType && isNotLastItem && !shouldHideDivider;

  return {
    isSelected,
    shouldShowDivider,
  };
};