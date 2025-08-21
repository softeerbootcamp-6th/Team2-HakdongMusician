import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const staffInfoSectionContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
});

export const staffInfoSectionContent = style({
  display: "flex",
  flexDirection: "row",
  gap: 112,
  padding: "60px 44px",
  boxSizing: "border-box",
  borderRadius: 8,
  backgroundColor: COLORS.white,
  width: "100%",
  minHeight: "400px",
});
