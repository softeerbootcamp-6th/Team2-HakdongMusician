import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { COLORS } from "@/styles/colors";

export const chip = recipe({
  base: {
    fontFamily: "Pretendard",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    fontSize: "13px",
    padding: "2px 6px",
    fontWeight: 500,
    color: COLORS.gray[100],
    backgroundColor: COLORS.gray[600],
    fontStyle: "normal",
    cursor: "pointer",
    border: "none",
    boxSizing: "border-box",
  },
  variants: {
    // 크기 variant
    flexRule: {
      spaceBetween: {
        justifyContent: "space-between",
      },
      center: {
        justifyContent: "center",
        paddingRight: "12px",
      },
      none: {},
    },
    round: {
      default: {
        borderRadius: "0px",
      },
      s: {
        borderRadius: "4px",
      },
      m: {
        borderRadius: "8px",
      },
      l: {
        borderRadius: "13.5px",
      },
    },
  },
  defaultVariants: {
    flexRule: "none",
    round: "default",
  },
});

export type ChipVariants = RecipeVariants<typeof chip>;
