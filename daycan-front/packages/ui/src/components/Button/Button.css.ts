import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

import { COLORS } from "../../styles";

export const button = recipe({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,

    height: "auto",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: COLORS.primary[300],
        color: COLORS.gray[900],
        "&:hover": {
          backgroundColor: COLORS.primary[200],
        },
      },
      error: {
        backgroundColor: COLORS.red[500],
        color: COLORS.white,
        "&:hover": {
          backgroundColor: COLORS.red[200],
        },
      },
      unEmphasized: {
        backgroundColor: COLORS.gray[200],
        color: COLORS.gray[700],
        "&:hover": {
          backgroundColor: COLORS.gray[300],
        },
      },
      disabled: {
        backgroundColor: COLORS.gray[200],
        color: COLORS.gray[500],
        cursor: "not-allowed",
      },
    },

    size: {
      large: {
        width: 358,
        height: 56,
      },

      small: {
        width: 80,
        height: 36,
        gap: 4,
      },

      fullWidth: {
        width: "100%",
        height: 48,
      },
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "large",
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
