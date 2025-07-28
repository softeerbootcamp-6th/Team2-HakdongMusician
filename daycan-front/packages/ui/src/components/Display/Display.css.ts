import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

import { COLORS } from "@/styles/colors";

export const display = recipe({
  base: {
    fontWeight: 700,
    lineHeight: "150%",
    fontFamily: "Pretendard, sans-serif",
    letterSpacing: "0%",
    color: COLORS.black,
  },

  variants: {
    type: {
      large: {
        fontSize: 48,
      },
      medium: {
        fontSize: 44,
      },
      small: {
        fontSize: 40,
      },
    },
  },

  defaultVariants: {
    type: "large",
  },
});

export type DisplayVariants = RecipeVariants<typeof display>;
