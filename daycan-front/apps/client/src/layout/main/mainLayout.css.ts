import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const layout = style({
  display: "flex",
  width: "100%",
  maxWidth: "450px",
  flexDirection: "column",
  alignItems: "center",

  margin: "0 auto",
  boxSizing: "border-box",
  backgroundColor: COLORS.gray[50],
});

export const wrapper = style({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

export const container = style({
  width: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
