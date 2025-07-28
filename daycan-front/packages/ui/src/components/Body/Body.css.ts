import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

import { COLORS } from "@/styles";

export const body = recipe({
  base: {
    lineHeight: "150%",
    fontFamily: "Pretendard, sans-serif",
    letterSpacing: "0%",
    color: COLORS.black,
  },

  variants: {
    type: {
      large: {
        fontSize: 19,
      },
      medium: {
        fontSize: 17,
      },
      small: {
        fontSize: 15,
      },
      xsmall: {
        fontSize: 13,
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
    weight: 400,
  },
});

export type BodyVariants = RecipeVariants<typeof body>;
