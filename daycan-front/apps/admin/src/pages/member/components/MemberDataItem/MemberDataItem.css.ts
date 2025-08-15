import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const profileImage = style({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: COLORS.gray[200],
  border: `1px solid ${COLORS.gray[300]}`,
});
