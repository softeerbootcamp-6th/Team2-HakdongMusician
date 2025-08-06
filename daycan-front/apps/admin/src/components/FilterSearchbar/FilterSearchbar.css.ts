import { style } from "@vanilla-extract/css";

export const filterSearchbarContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const filterSearchbarContent = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "16px 0px",
});
