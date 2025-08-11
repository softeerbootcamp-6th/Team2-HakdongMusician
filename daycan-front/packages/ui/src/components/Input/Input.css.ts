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
    padding: "16px 24px",
    transition: "all 0.2s ease-in-out",
    ":hover": {
      border: `1px solid ${COLORS.gray[300]}`,
      boxShadow: `0px 0px 8px rgba(59, 130, 246, 0.15)`,
      backgroundColor: COLORS.gray[100],
    },

    ":focus-within": {
      border: `2px solid ${COLORS.gray[300]}`,
      backgroundColor: COLORS.white,
      outline: "none",
    },
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

export const inputElement = recipe({
  base: {
    background: "transparent",
    border: "none",
    outline: "none",
    width: "100%",
    selectors: {
      "&::placeholder": {
        color: COLORS.gray[500],
        fontWeight: 500,
        fontFamily: "Pretendard, sans-serif",
        lineHeight: "150%",
      },
      "&:-webkit-autofill": {
        WebkitTextFillColor: "#000",
        boxShadow: "0 0 0px 1000px transparent inset",
        transition: "background-color 5000s ease-in-out 0s",
      },
      "&:-webkit-autofill:hover": {
        WebkitTextFillColor: "#000",
      },
      "&:-webkit-autofill:focus": {
        WebkitTextFillColor: "#000",
      },
    },
  },
  variants: {
    fontSize: {
      xsmall: {
        fontSize: "13px",
      },
      small: {
        fontSize: "15px",
      },
      medium: {
        fontSize: "17px",
      },
      large: {
        fontSize: "19px",
      },
    },
  },
  defaultVariants: {
    fontSize: "xsmall",
  },
});

export type InputVariants = RecipeVariants<typeof input>;
export type InputElementVariants = RecipeVariants<typeof inputElement>;
