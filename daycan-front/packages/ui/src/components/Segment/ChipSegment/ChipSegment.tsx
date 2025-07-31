import React from 'react';
import { Chip } from '../../Chip';
import { Body } from '../../Body';
import { COLORS } from '@/styles/colors';

interface ChipSegmentProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

/**
 * ChipSegment 컴포넌트는 Chip 컴포넌트를 사용하여 옵션을 표시합니다.
 * @param options - 선택 가능한 옵션들
 * @param value - 현재 선택된 값
 * @param onChange - 값 변경 핸들러
 * @returns ChipSegment 컴포넌트
 */

export const ChipSegment = ({ options, value, onChange }: ChipSegmentProps) => {
  return (
    <>
      {options.map((option: string) => {
        const isSelected = value === option;
        
        return (
          <Chip 
            key={option}
            selected={isSelected}
            onClick={() => onChange(option)}
            size="btnXsmall"
            padding="btnXsmall"
            flexRule="center"
          >
            <Body 
              type="xsmall" 
              weight={500} 
              color={isSelected ? COLORS.white : COLORS.gray[800]}
            >
              {option}
            </Body>
          </Chip>
        );
      })}
    </>
  );
};
