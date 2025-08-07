import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  borderRadius: "16px",
  backgroundColor: COLORS.white,
  padding: "24px",
  boxSizing: "border-box",
});

export const titleContainer = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "4px",
});
export const imageContainer = style({
  display: "flex",
  justifyContent: "flex-end",
  flex: 1,
});
