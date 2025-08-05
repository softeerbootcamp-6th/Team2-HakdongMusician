import { style } from "@vanilla-extract/css";

export const chartLayoutContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  boxSizing: "border-box",
  width: "100%",
});

export const chartLayoutTitle = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "start",
  justifyContent: "start",
  gap: 6,
});
