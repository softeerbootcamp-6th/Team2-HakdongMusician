import { style } from "@vanilla-extract/css";

export const headerContainer = style({
  width: "100%",
  height: "64px",
  backgroundColor: "inherit",
  padding: "12px 0px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const headerLeft = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
});

export const headerRight = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});
