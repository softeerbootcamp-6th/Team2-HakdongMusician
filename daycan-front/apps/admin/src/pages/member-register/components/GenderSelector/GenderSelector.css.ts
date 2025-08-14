import { COLORS } from "@daycan/ui";
import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

export const labelContainer = style({
  flexShrink: 0,
});

export const memberInfoSectionContent = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
  gap: 24,
});

export const chipContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  flex: 1,
  minWidth: 0,
});

export const genderButton = recipe({
  base: {
    width: "100%",
    height: "64px",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: COLORS.gray[400],
    },
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: COLORS.gray[600],
      },
      false: {
        backgroundColor: COLORS.gray[50],
      },
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});
