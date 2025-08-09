import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { COLORS } from "../../styles";

export const toast = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.gray[800],
    borderRadius: 16,
    margin: 0,
  },

  variants: {
    variant: {
      pc: {
        padding: "16px 20px",
        minWidth: 320,
        maxWidth: 480,
      },
      mobile: {
        padding: "12px 16px",
        minWidth: 280,
        maxWidth: 320,
      },
    },
  },

  defaultVariants: {
    variant: "pc",
  },
});

export const toastIcon = style({
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const toastContainer = style({
  vars: {
    "--toastify-toast-width": "fit-content",
  },
  // react-toastify의 top-center 기본 포지셔닝을 덮어써서 정확히 중앙 정렬
  left: "0 !important",
  right: "0 !important",
  transform: "none !important",
  margin: "0 auto !important",
  display: "flex",
  justifyContent: "center",
  pointerEvents: "none",
});

export type ToastVariants = RecipeVariants<typeof toast>;
