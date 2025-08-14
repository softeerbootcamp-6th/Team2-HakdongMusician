import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { COLORS } from "@daycan/ui";

export const itemContainer = recipe({
  base: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "16px",
    padding: "16px 5px",
    backgroundColor: COLORS.white,
    borderBottom: `1px solid ${COLORS.gray[200]}`,
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  variants: {
    isActive: {
      true: {
        backgroundColor: COLORS.primary[100],
        borderLeft: `4px solid ${COLORS.primary[300]}`,
      },
      false: {
        backgroundColor: COLORS.white,
        borderLeft: "4px solid transparent",
      },
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

export const cell = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textAlign: "center",
  width: "100%",
});

export const checkboxWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "4px",
  transition: "background-color 0.2s ease",

  selectors: {
    "&:hover": {
      backgroundColor: COLORS.gray[100],
    },
  },
});
