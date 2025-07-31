import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const layout = style({
  minHeight: "100vh",
  backgroundColor: COLORS.gray[900],
  display: "flex",
  width: "100%",
  maxWidth: 360,
  flexDirection: "column",
  alignItems: "center",
  padding: "0px 16px",
  margin: "0 auto",
  boxSizing: "border-box",
});

export const wrapper = style({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

export const container = style({
  maxWidth: 420,
  width: "100%",
  margin: "0 auto",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
