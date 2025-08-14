import { style } from "@vanilla-extract/css";
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

export const memberListItemCode = style({
  padding: "4px 8px",
  borderRadius: "4px",
  backgroundColor: COLORS.gray[100],
  transition: "all 0.2s ease",
  selectors: {
    [`${memberListItemContainer}:hover &`]: {
      backgroundColor: COLORS.gray[200],
      color: COLORS.gray[900],
    },
  },
});
