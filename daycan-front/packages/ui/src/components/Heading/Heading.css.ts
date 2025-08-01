import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

import { COLORS } from "@/styles/colors";

export const heading = recipe({
  base: {
    fontWeight: 700,
    lineHeight: "150%",
    fontFamily: "Pretendard, sans-serif",
    letterSpacing: "0%",
    color: COLORS.black,
  },

  variants: {
    type: {
      xlarge: {
        fontSize: 36,
      },
      large: {
        fontSize: 32,
      },
      medium: {
        fontSize: 28,
      },
      small: {
        fontSize: 24,
      },
      xsmall: {
        fontSize: 22,
      },
    },
    weight: {
      600: {
        fontWeight: 600,
      },
      500: {
        fontWeight: 500,
      },
      400: {
        fontWeight: 400,
      },
    },
  },

  defaultVariants: {
    type: "medium",
    weight: 600,
  },
});

export type HeadingVariants = RecipeVariants<typeof heading>;
