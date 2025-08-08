import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const memberListContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  backgroundColor: COLORS.gray[50],
  borderRadius: "12px",
});
