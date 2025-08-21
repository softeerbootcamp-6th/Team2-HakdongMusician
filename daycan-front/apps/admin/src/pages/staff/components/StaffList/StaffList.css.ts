import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const staffListContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
});

export const itemsContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "500px",
  overflowY: "scroll",
  padding: "0px 8px 0px 16px",
  marginTop: "8px",
  boxSizing: "border-box",
  borderRadius: "8px",
  backgroundColor: COLORS.white,
});
