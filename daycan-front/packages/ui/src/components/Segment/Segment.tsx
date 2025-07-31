import React, { PropsWithChildren, HTMLAttributes } from 'react';
import { classNames } from "@/utils";

import { segment, type SegmentVariants } from "./Segment.css";
import { CustomWidthHeightType } from "@/utils";
import { ChipSegment } from './ChipSegment';
import { ItemSegment } from './ItemSegment';

export type SegmentProps = PropsWithChildren<
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & 
  SegmentVariants & 
  CustomWidthHeightType & {
    options: string[];
    value: string;
    onChange: (val: string) => void;
  }
>;

/* 
    Segment 컴포넌트입니다.
    @param variant - Segment 스타일 변형
    @param options - 선택 가능한 옵션들
    @param value - 현재 선택된 값
    @param onChange - 값 변경 핸들러
    @param useChip - true면 Chip 컴포넌트 사용, false면 SegmentItem 컴포넌트 사용 (기본값: false)
    @returns Segment 컴포넌트
*/

export const Segment = ({
  variant,
  children,
  options,
  onChange,
  value,
  useChip = false,
  ...props
}: SegmentProps) => {
  return (
    <div
      className={classNames(segment({ variant, useChip }))}
      style={{ width: props.customWidth, height: props.customHeight }}
      {...props}
    >
      {useChip ? (
        <ChipSegment 
          options={options}
          value={value}
          onChange={onChange}
        />
      ) : (
        <ItemSegment 
          options={options}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};