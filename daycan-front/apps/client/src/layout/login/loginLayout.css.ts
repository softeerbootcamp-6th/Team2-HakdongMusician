import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const layout = style({
  display: "flex",
  width: "100%",
  maxWidth: "450px",
  minWidth: "390px",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 auto",
  boxSizing: "border-box",
  backgroundColor: COLORS.white,
});
