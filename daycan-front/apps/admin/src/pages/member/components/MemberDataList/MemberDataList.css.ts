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
  gap: "16px",
});

export const memberDataListItem = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  boxSizing: "border-box",
  paddingRight: "16px",
  backgroundColor: COLORS.white,
  border: `1px solid ${COLORS.gray[200]}`,
  width: "100%",
  height: "52px",
  borderRadius: "11px",
  gap: "16px",
});
