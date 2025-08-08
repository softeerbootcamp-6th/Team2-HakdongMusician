import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { COLORS } from "@/styles/colors";
import { style } from "@vanilla-extract/css";

export const input = recipe({
  base: {
    fontFamily: "Pretendard",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "13px",
    fontWeight: 500,
    borderRadius: "8px",
    border: `1px solid ${COLORS.gray[200]}`,
    boxSizing: "border-box",
    boxShadow: `0px 0px 4px rgba(0, 0, 0, 0.05)`,
    width: "100%",
    height: "100%",
  },
  variants: {
    variant: {
      white: {
        backgroundColor: COLORS.white,
      },
      grayLight: {
        backgroundColor: COLORS.gray[50],
      },
    },
    inputSize: {
      pcInputFile: {
        padding: "12px 24px",
        width: "668px",
        height: "56px",
      },
      moTextField: {
        padding: "16px 20px",
        width: "358px",
        height: "56px",
      },
      pcTextField: {
        padding: "0px 12px",
        width: "300px",
        height: "42px",
      },
      pcTextFieldLarge: {
        padding: "16px 24px",
        width: "532px",
        height: "64px",
      },
      textSearch: {
        padding: "6px 12px",
        width: "256px",
        height: "40px",
      },
      allTextFieldSmall: {
        padding: "0px 12px",
        width: "86px",
        height: "32px",
      },
      // 모바일에서 사용을 하기 어려운 경우 직접 width, height를 지정해서 사용을 위한 full size
      full: {
        width: "100%",
        height: "100%",
      },
    },
    flexRule: {
      center: {
        justifyContent: "center",
      },
      spaceBetween: {
        justifyContent: "space-between",
      },
      none: {},
    },
  },
  defaultVariants: {
    variant: "white",
    inputSize: "full",
    flexRule: "spaceBetween",
  },
});

export const inputStyle = recipe({
  base: {
    border: "none",
    outline: "none",
    width: "100%",
  },
  variants: {
    color: {
      white: {
        backgroundColor: COLORS.white,
      },
      grayLight: {
        backgroundColor: COLORS.gray[50],
      },
    },
  },
  defaultVariants: {
    color: "white",
  },
});

export type InputVariants = RecipeVariants<typeof input>;
export type InputStyleVariants = RecipeVariants<typeof inputStyle>;
