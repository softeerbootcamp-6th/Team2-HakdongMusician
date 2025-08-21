import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";
import { recipe } from "@vanilla-extract/recipes";

export const dropDownContainer = style({
  position: "relative",
  display: "inline-block",
  width: "100%",
});

export const dropDownButton = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 24px",
  boxSizing: "border-box",
  backgroundColor: COLORS.gray[50],
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  minHeight: "56px",
  height: "64px",

  ":hover": {
    backgroundColor: COLORS.gray[100],
  },

  ":focus": {
    outline: "none",
    backgroundColor: COLORS.white,
  },
});

export const dropDownPanel = style({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  backgroundColor: COLORS.white,
  border: `1px solid ${COLORS.gray[200]}`,
  borderRadius: "8.67px",
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  zIndex: 1000,
  marginTop: "4px",
  maxHeight: "200px",
  overflowY: "auto",
});

export const dropDownOption = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    margin: "8px",
    padding: "4px 8px",
    boxSizing: "border-box",
    borderRadius: "5.33px",
    height: "34px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",

    ":hover": {
      backgroundColor: COLORS.primary[200],
    },
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: COLORS.primary[300],
      },
      false: {
        backgroundColor: COLORS.white,
      },
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

export const dropDownIcon = style({
  flexShrink: 0,
});
