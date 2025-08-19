import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const reportListContainer = style({
  padding: "0 15px",
  marginTop: "10px",
  borderRadius: "10px",
  height: "200px",
  overflowY: "auto",

  backgroundColor: COLORS.white,
});

export const disabledCheckbox = style({
  cursor: "not-allowed",
  opacity: 0.3,
});
