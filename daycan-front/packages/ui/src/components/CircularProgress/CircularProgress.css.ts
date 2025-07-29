import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

import { COLORS } from "../../styles";

export const circularProgressContainer = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const circularProgress = recipe({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
  },

  variants: {
    size: {
      small: {
        width: 32,
        height: 32,
      },
      medium: {
        width: 48,
        height: 48,
      },
      large: {
        width: 64,
        height: 64,
      },
    },
  },

  defaultVariants: {
    size: "medium",
  },
});

export const circularProgressSvg = style({
  transform: "rotate(-90deg)",
  width: "100%",
  height: "100%",
});

export const circularProgressCircle = style({
  fill: "none",
  strokeWidth: 4,
});

export const circularProgressTrack = style({
  stroke: COLORS.gray[200],
});

export const circularProgressIndicator = style({
  stroke: COLORS.primary[300],
  strokeLinecap: "round",
  transition:
    "stroke-dasharray 0.6s ease-in-out, stroke-dashoffset 0.6s ease-in-out",
});

export const circularProgressText = style({
  position: "absolute",
  fontSize: 12,
  fontWeight: 600,
  color: COLORS.gray[800],
  userSelect: "none",
  transition: "opacity 0.3s ease-in-out",
});

export type CircularProgressVariants = RecipeVariants<typeof circularProgress>;
