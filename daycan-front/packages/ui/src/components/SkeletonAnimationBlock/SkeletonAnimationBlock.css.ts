import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { keyframes } from "@vanilla-extract/css";

import { COLORS } from "../../styles";

const shimmer = keyframes({
  "0%": {
    transform: "translateX(-100%)",
  },
  "100%": {
    transform: "translateX(100%)",
  },
});

export const skeleton = recipe({
  base: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: COLORS.gray[200],
    borderRadius: 4,
  },

  variants: {
    variant: {
      default: {},
      circle: {
        borderRadius: "50%",
      },
      card: {
        borderRadius: 8,
      },
    },

    backgroundColor: {
      default: {
        backgroundColor: COLORS.gray[200],
      },
      light: {
        backgroundColor: COLORS.gray[100],
      },
      dark: {
        backgroundColor: COLORS.gray[300],
      },
    },

    size: {
      profile: {
        width: 30,
        height: 30,
      },
      xSmall: {
        width: 30,
        height: 10,
      },
      small: {
        width: 60,
        height: 20,
      },
      medium: {
        width: 120,
        height: 24,
      },
      large: {
        width: 200,
        height: 32,
      },
      fullWidth: {
        width: "100%",
        height: 24,
      },
    },
  },

  defaultVariants: {
    variant: "default",
    backgroundColor: "default",
    size: "fullWidth",
  },
});

export const shimmerOverlay = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: `linear-gradient(90deg, transparent, ${COLORS.gray[500]}, transparent)`,
  animation: `${shimmer} 3s infinite`,
} as const;

export type SkeletonVariants = RecipeVariants<typeof skeleton>;
