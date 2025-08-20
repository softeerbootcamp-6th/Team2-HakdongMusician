import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const timeSelect = style({
  position: "relative",
  width: 180,
  height: 56,
});

export const timeSelectButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  border: `1px solid ${COLORS.gray[200]}`,
  borderRadius: "8px",
  backgroundColor: "white",
  cursor: "pointer",
  minWidth: "80px",
  transition: "all 0.2s ease",
  ":hover": {
    borderColor: COLORS.gray[200],
    backgroundColor: COLORS.gray[50],
  },
});

export const timeSelectPanel = style({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  zIndex: 10,
  marginTop: "4px",
  padding: "8px",
  boxSizing: "border-box",
});

export const timeSelectOption = recipe({
  base: {
    margin: "8px 0px",
    padding: "8px",
    boxSizing: "border-box",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    selectors: {
      "&:hover": {
        backgroundColor: COLORS.primary[300],
      },
    },
    borderRadius: "8px",
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: COLORS.gray[50],
      },
      false: {
        backgroundColor: "transparent",
      },
    },
  },
});

export const timeSelectIcon = style({
  transition: "transform 0.2s ease",
});

export const timeSelectOptionSeparator = style({
  borderBottom: `1px solid ${COLORS.gray[200]}`,
  selectors: {
    "&:last-child": {
      display: "none",
    },
  },
});
