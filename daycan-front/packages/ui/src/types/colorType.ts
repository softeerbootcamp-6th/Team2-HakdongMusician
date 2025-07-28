import { COLORS } from "../styles";

// 색상 타입 정의
export type ColorKey = keyof typeof COLORS;
export type GrayScaleKey = keyof typeof COLORS.gray;
export type PrimaryKey = keyof typeof COLORS.primary;
export type DimKey = keyof typeof COLORS.dim;
export type ChipColorKey = "red" | "yellow" | "blue" | "green";
export type ChipShadeKey = "200" | "500";

// 색상 카테고리별 분류
export const COLOR_CATEGORIES = {
  grayscale: [
    "white",
    "black",
    "transparent",
    "gray50",
    "gray100",
    "gray200",
    "gray300",
    "gray400",
    "gray500",
    "gray600",
    "gray700",
    "gray800",
    "gray900",
  ] as const,
  primary: ["primary100", "primary200", "primary300", "gradient"] as const,
  transparency: ["dim100", "dim250", "dim500", "dim750"] as const,
  chips: ["red", "yellow", "blue", "green"] as const,
} as const;
