import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const itemRow = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: `1px solid ${COLORS.gray[100]}`,
});
