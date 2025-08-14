import { style } from "@vanilla-extract/css";

export const guardianInfoSectionContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "488px",
  gap: 16,
  boxSizing: "border-box",
  borderRadius: 8,
  marginBottom: 60,
});

export const labelContainer = style({
  flexShrink: 0,
});

export const guardianInfoSectionContent = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
  gap: 24,
});

export const chipContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  flex: 1,
  minWidth: 0,
});
