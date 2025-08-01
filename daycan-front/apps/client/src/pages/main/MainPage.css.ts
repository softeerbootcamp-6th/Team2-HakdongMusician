import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const container = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: COLORS.gray[50],
});
