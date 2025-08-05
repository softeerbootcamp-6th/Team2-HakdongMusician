import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const container = style({
  display: "flex",
  flexDirection: "column",
  padding: "16px 12px",
  backgroundColor: COLORS.gray[50],
});
