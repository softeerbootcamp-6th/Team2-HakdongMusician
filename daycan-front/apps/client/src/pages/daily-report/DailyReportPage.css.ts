import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  boxSizing: "border-box",
  minHeight: "100dvh",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  width: "100%",
  height: "100%",
});

export const headingContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "start",
  alignSelf: "start",
  padding: "0 10px",
});

export const heading = style({
  display: "flex",
  flexDirection: "row",
  alignSelf: "start",
  alignItems: "start",
  gap: 5,
});
