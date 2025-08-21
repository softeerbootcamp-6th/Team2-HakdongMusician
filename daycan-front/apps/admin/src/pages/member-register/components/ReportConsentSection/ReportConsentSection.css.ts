import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const reportConsentSectionContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const reportConsentSectionContent = style({
  display: "flex",
  backgroundColor: COLORS.white,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: 8,
  height: "88px",
  padding: "0 32px",
  boxSizing: "border-box",
});

export const reportConsentSectionLeftContent = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 16,
});
