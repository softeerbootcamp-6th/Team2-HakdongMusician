import { style } from "@vanilla-extract/css";

export const greeting = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  height: "300px",
  width: "100%",
  boxSizing: "border-box",
  padding: "10px",
});
