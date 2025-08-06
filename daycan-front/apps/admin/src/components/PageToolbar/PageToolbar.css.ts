import { style } from "@vanilla-extract/css";

export const pageToolbarContainer = style({
  display: "flex",
  flexDirection: "column",
  marginTop: "68px",
  justifyContent: "space-between",
});

export const pageToolbarContent = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});
