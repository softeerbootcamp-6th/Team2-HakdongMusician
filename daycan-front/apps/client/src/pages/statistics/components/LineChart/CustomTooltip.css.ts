import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const customTooltip = style({
  backgroundColor: COLORS.white,
  border: `1px solid ${COLORS.gray[200]}`,
  borderRadius: "8px",
  padding: "8px 12px",
  boxShadow: `0 2px 8px ${COLORS.gray[200]}`,
});
