import { style } from "@vanilla-extract/css";

export const memberInfoSectionContent = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  width: "100%",
  boxSizing: "border-box",
  gap: 24,
});

export const labelContainer = style({
  flexShrink: 0,
  alignSelf: "flex-start",
  paddingTop: "20px",
});

export const inputContainer = style({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 8,
});
