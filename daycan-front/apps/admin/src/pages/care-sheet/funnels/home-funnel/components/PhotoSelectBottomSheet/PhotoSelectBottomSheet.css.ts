import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const bottomSheetContent = style({
  display: "flex",
  flexDirection: "row",
  padding: "12px",
  boxSizing: "border-box",
  gap: 10,
});

export const methodCard = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  borderRadius: "16px",
  gap: 10,
  ":hover": {
    backgroundColor: COLORS.gray[100],
  },
});
