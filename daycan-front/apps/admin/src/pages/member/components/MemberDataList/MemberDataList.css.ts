import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const memberDataListContainer = style({
  display: "flex",
  flexDirection: "column",
  maxWidth: "1084px",
  gap: "8px",
});

export const memberDataList = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const itemsContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "0px 16px",
  marginTop: "8px",
  boxSizing: "border-box",
  borderRadius: "8px",
  backgroundColor: COLORS.white,
});
