import React, { HTMLAttributes } from 'react';
import { classNames } from '@/utils';
import { segmentItem, type SegmentItemVariants } from './SegmentItem.css';

export type SegmentItemProps = HTMLAttributes<HTMLDivElement> & SegmentItemVariants;

/**
 * SegmentItem 컴포넌트는 Segment의 각 아이템을 나타냅니다.
 * Chip컴포넌트와 다르게 SegmentItem은 ItemSegment내에서만 사용하므로 해당 위치에 작성합니다.
 * @param selected - 현재 선택된 상태
 * @returns SegmentItem 컴포넌트
 */

export const SegmentItem = ({
  children,
  selected,
  onClick,
  ...props
}: SegmentItemProps) => {
  return (
    <div
      className={classNames(segmentItem({ selected }))}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};