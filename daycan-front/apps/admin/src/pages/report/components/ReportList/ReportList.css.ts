import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const reportListContainer = style({
  padding: "0 8px 0 16px",
  marginTop: "10px",
  borderRadius: "10px",
  height: "200px",
  overflowY: "scroll",

  backgroundColor: COLORS.white,
});

export const disabledCheckbox = style({
  cursor: "not-allowed",
  opacity: 0.3,
});
