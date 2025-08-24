import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const layout = style({
  minHeight: "100dvh",
  display: "flex",
  width: "100%",
  maxWidth: "450px",
  minWidth: "390px",
  flexDirection: "column",
  alignItems: "center",
  padding: "0px 16px",
  margin: "0 auto",
  boxSizing: "border-box",
  backgroundColor: COLORS.gray[50],
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

export const container = style({
  width: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
