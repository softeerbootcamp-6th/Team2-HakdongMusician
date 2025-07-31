import React from 'react';
import { SegmentItem } from './SegmentItem';
import { Body } from '../../Body';
import { COLORS } from '@/styles/colors';

interface ItemSegmentProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

/**
 * ItemSegment 컴포넌트는 SegmentItem 컴포넌트를 사용하여 옵션을 표시합니다.
 * @param options - 선택 가능한 옵션들
 * @param value - 현재 선택된 값
 * @param onChange - 값 변경 핸들러
 * @returns ItemSegment 컴포넌트
 */

export const ItemSegment = ({ options, value, onChange }: ItemSegmentProps) => {
  return (
    <>
      {options.map((option: string, index: number) => {
        const isSelected = value === option;
        const isNextSelected = index < options.length - 1 && value === options[index + 1];

        return (
          <React.Fragment key={option}>
            <SegmentItem 
              selected={isSelected}
              onClick={() => onChange(option)}
            >
              <Body 
                type="xsmall" 
                weight={500} 
                color={isSelected ? COLORS.gray[800] : COLORS.gray[600]}
              >
                {option}
              </Body>
            </SegmentItem>
            {/* 마지막 아이템이 아닌 경우 divider 추가 */}
            {index < options.length - 1 && (
              <div 
                style={{
                  width: '1px',
                  height: '24px',
                  backgroundColor: (isSelected || isNextSelected) ? 'transparent' : COLORS.gray[400],
                  transition: 'background-color 0.2s ease',
                  alignSelf: 'center',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
