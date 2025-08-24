import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const layout = style({
  display: "flex",
  width: "100%",
  maxWidth: "450px",
  minWidth: "390px",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 auto",
  boxSizing: "border-box",
  backgroundColor: COLORS.gray[50],
});

export const container = style({
  width: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: COLORS.gray[50],
});
