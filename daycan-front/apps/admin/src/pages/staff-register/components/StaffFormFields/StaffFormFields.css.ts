import { style } from "@vanilla-extract/css";

export const staffFormFieldsContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  flex: 1,
});

export const staffFormFieldRow = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 24,
});

export const staffFormFieldLabel = style({
  width: "68px",
  flexShrink: 0,
});

export const staffFormFieldInput = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  maxWidth: "396px",
  minHeight: "64px",
  gap: 8,
});
