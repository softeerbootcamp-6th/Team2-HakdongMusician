import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const dataListHeaderContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: COLORS.gray[100],
  border: `1px solid ${COLORS.gray[200]}`,
  borderRadius: "8px",
  maxWidth: "1084px",
  width: "100%",
  height: "43px",
  padding: "10px 16px",
  boxSizing: "border-box",
});
export const dataListHeaderItem = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  maxWidth: "1052px",
  width: "100%",
});
export const headerColumn = style({
  textAlign: "center",
});

export const actionColumn = style({
  width: "100px",
  display: "flex",
  justifyContent: "flex-end",
});
