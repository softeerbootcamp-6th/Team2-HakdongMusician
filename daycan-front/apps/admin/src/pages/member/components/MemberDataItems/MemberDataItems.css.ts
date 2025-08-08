import { COLORS } from "@daycan/ui";
import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const memberDataList = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

// memberDataListItem을 recipe로 변경
export const memberDataListItem = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: "16px",
    boxSizing: "border-box",
    backgroundColor: COLORS.white,
    height: "52px",
  },
  variants: {
    hasDetail: {
      true: {
        borderRadius: "11px 11px 0 0", // 하단 border radius 제거
      },
      false: {
        borderRadius: "11px", // 기본 border radius
      },
    },
  },
  defaultVariants: {
    hasDetail: false,
  },
});

// 각 컬럼 스타일
export const orderColumn = style({
  width: "80px",
  minWidth: "80px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const profileColumn = style({
  width: "60px",
  minWidth: "60px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const nameColumn = style({
  width: "120px",
  minWidth: "120px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const birthDateColumn = style({
  width: "120px",
  minWidth: "120px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const genderColumn = style({
  width: "80px",
  minWidth: "80px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const careGradeColumn = style({
  width: "100px",
  minWidth: "100px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const careNumberColumn = style({
  width: "150px",
  minWidth: "150px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const guardianContactColumn = style({
  width: "130px",
  minWidth: "130px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const profileImage = style({
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  objectFit: "cover",
});

const slideDown = keyframes({
  "0%": {
    maxHeight: "0px",
    opacity: "0",
    transform: "translateY(-10px)",
  },
  "75%": {
    maxHeight: "600px",
    opacity: "0.75",
    transform: "translateY(20px)",
  },
  "100%": {
    maxHeight: "600px",
    opacity: "1",
    transform: "translateY(0)",
  },
});

const slideUp = keyframes({
  "0%": {
    maxHeight: "600px",
    opacity: "1",
    transform: "translateY(0)",
  },
  "100%": {
    maxHeight: "0px",
    opacity: "0",
    transform: "translateY(-10px)",
  },
});

export const dataDetailContainer = recipe({
  base: {
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    maxHeight: "0px",
    opacity: "0",
    transform: "translateY(-10px)",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
  },
  variants: {
    state: {
      default: {
        // 기본 상태
      },
      open: {
        animation: `${slideDown} 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
      },
      closed: {
        animation: `${slideUp} 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export const detailCardLayout = style({
  flex: 4,
  display: "flex",
  flexDirection: "row",
});
