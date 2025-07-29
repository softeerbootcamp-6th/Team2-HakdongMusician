// BottomSheet.css.ts
import { style, keyframes } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { COLORS } from "../../styles";

// 1. keyframes 정의
const slideUp = keyframes({
  "0%": { transform: "translateY(100%)" },
  "100%": { transform: "translateY(0)" },
});

const slideDown = keyframes({
  "0%": { transform: "translateY(0)" },
  "100%": { transform: "translateY(100%)" },
});

// 2. Overlay는 그대로 유지
export const overlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: COLORS.dim[500],
  zIndex: 1000,
  opacity: 1,
  transition: "opacity 0.3s ease",
});

// 3. BottomSheet base 스타일
export const bottomSheetBase = style({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: COLORS.white,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  padding: "24px",
  zIndex: 1001,
  boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.15)",
  willChange: "transform",
});

// 4. 애니메이션 상태별 스타일
export const animateUp = style({
  animation: `${slideUp} 0.6s cubic-bezier(0.4, 0, 0.2, 1)`,
});

export const animateDown = style({
  animation: `${slideDown} 0.6s cubic-bezier(0.4, 0, 0.2, 1)`,
});

// 기타 스타일 유지
export const title = style({
  fontSize: "18px",
  fontWeight: "600",
  color: COLORS.gray[900],
  marginBottom: "16px",
  textAlign: "center",
});

export const content = style({
  overflowY: "auto",
  maxHeight: "calc(100% - 60px)",
});

export const handle = style({
  width: "40px",
  height: "4px",
  backgroundColor: COLORS.gray[300],
  borderRadius: "2px",
  margin: "0 auto 16px",
});
