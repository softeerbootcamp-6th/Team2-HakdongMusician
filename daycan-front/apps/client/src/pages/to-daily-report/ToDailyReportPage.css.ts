import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: "100vh",
  backgroundColor: COLORS.gray[50],
  boxSizing: "border-box",
  padding: "20px 20px 0px 20px",
});

export const animationContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "32px",
});

export const textContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});
