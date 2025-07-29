import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

import { COLORS } from "../../styles";

export const toggleContainer = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
});

export const toggle = recipe({
  base: {
    position: "relative",
    width: 48,
    height: 24,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
  },

  variants: {
    checked: {
      true: {
        backgroundColor: COLORS.primary[300],
      },
      false: {
        backgroundColor: COLORS.gray[200],
      },
    },
  },

  defaultVariants: {
    checked: false,
  },
});

export const toggleSlider = style({
  width: 20,
  height: 20,
  borderRadius: "50%",
  backgroundColor: COLORS.white,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out",
  margin: "0 2px",
  transform: "translateX(0)",
});

export const toggleSliderChecked = style({
  transform: "translateX(24px)",
});

export type ToggleVariants = RecipeVariants<typeof toggle>;
