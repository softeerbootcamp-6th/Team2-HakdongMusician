import { COLORS } from "../styles/colors";
import type {
  ColorKey,
  GrayScaleKey,
  PrimaryKey,
  DimKey,
  ChipColorKey,
  ChipShadeKey,
} from "../types";

/**
 * 색상 값을 가져오는 유틸리티 함수입니다.
 * @author 홍규진
 * @param colorKey 색상 키 (gray, primary, dim, chip)
 * @returns 색상 값
 */

export const getColor = (colorKey: ColorKey): string => {
  return COLORS[colorKey] as string;
};

// 그레이스케일 색상 가져오기
export const getGray = (grayKey: GrayScaleKey): string => {
  return COLORS.gray[grayKey];
};

// 프라이머리 색상 가져오기
export const getPrimary = (primaryKey: PrimaryKey): string => {
  return COLORS.primary[primaryKey];
};

// 투명도 색상 가져오기
export const getDimColor = (dimKey: DimKey): string => {
  return COLORS.dim[dimKey];
};

// 칩 색상 가져오기
export const getChipColor = (
  color: ChipColorKey,
  shade: ChipShadeKey,
): string => {
  return COLORS[color][shade];
};

// 색상 유효성 검사
export const isValidColor = (colorKey: string): colorKey is ColorKey => {
  return colorKey in COLORS;
};
