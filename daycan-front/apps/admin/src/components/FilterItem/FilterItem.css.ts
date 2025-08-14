import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { COLORS } from "@daycan/ui";

export const filterItemContainer = style({
  position: "relative",
});

export const filterItem = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "1px solid transparent",
    userSelect: "none",
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: COLORS.gray[600],
        color: COLORS.white,
        borderColor: COLORS.gray[600],
      },
      false: {
        backgroundColor: COLORS.white,
        color: COLORS.gray[800],
        borderColor: COLORS.gray[200],
        "&:hover": {
          backgroundColor: COLORS.gray[50],
          borderColor: COLORS.gray[300],
        },
      },
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

export const iconWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const dropdownContainer = style({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 10,
  marginTop: "4px",
});

export const dropdown = style({
  backgroundColor: COLORS.white,
  border: `1px solid ${COLORS.gray[200]}`,
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
});

export const dropdownItem = style({
  padding: "8px 16px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  selectors: {
    "&:hover": {
      backgroundColor: COLORS.primary[200],
    },
    "&:not(:last-child)": {
      borderBottom: `1px solid ${COLORS.gray[100]}`,
    },
  },
});
