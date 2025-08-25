import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { COLORS } from "@daycan/ui";

export const memberListItemContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  borderRadius: "8px",
  transition: "background-color 0.2s ease",
  backgroundColor: COLORS.white,
  padding: "12px",
  boxSizing: "border-box",
  ":hover": {
    backgroundColor: COLORS.gray[200],
  },
});

export const memberListItemProfile = style({
  borderRadius: "50%",
  backgroundColor: COLORS.gray[100],
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});

export const memberListItemInfo = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const memberListItemCode = recipe({
  base: {
    padding: "4px 8px",
    borderRadius: "4px",
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: COLORS.primary[200],
        color: COLORS.black,
      },
      false: {
        backgroundColor: COLORS.gray[100],
        color: COLORS.gray[700],
      },
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});
