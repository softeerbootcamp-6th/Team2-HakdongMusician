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
    borderRadius: {
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
      fullWidth: {
        width: "100%",
        //ListItemLayout내의 text default height이 22px
        height: "22px",
      },
      fullWidthHeight: {
        width: "100%",
        height: "100%",
      },
    },
  },

  defaultVariants: {
    borderRadius: "default",
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
