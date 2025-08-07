import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const layout = style({
  height: "100dvh",
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
});
