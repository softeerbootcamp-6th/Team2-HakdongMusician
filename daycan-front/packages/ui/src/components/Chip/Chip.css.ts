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
    color: {
      grayLight: {
        backgroundColor: COLORS.gray[200],
        color: COLORS.gray[700],
      },
      grayDark: {
        backgroundColor: COLORS.gray[600],
        color: COLORS.gray[50],
      },
      yellow: {
        backgroundColor: COLORS.yellow[200],
        color: COLORS.yellow[500],
      },
      red: {
        backgroundColor: COLORS.red[200],
        color: COLORS.red[500],
      },
      green: {
        backgroundColor: COLORS.green[200],
        color: COLORS.green[500],
      },
      blue: {
        backgroundColor: COLORS.blue[200],
        color: COLORS.blue[500],
      },
      reverseRed: {
        backgroundColor: COLORS.red[500],
        color: COLORS.white,
      },
      reverseGreen: {
        backgroundColor: COLORS.green[500],
        color: COLORS.green[200],
      },
      reverseBlue: {
        backgroundColor: COLORS.blue[500],
        color: COLORS.blue[200],
      },
    },
  },
  defaultVariants: {
    flexRule: "none",
    round: "default",
    color: "grayLight",
  },
});

export type ChipVariants = RecipeVariants<typeof chip>;
