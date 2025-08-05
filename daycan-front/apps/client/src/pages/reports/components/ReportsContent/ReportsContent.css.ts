import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const reportsContentContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  gap: 16,
  backgroundColor: COLORS.gray[50],
});

export const reportsContentHeader = style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "56px",
  justifyContent: "space-between",
  backgroundColor: COLORS.white,
  padding: 16,
  boxSizing: "border-box",
  borderRadius: 16,
});

export const reportsContentHeaderLeft = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  gap: 11,
});
export const reportsContentHeaderRight = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

export const reportsContentBody = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",

  backgroundColor: COLORS.gray[50],
  borderRadius: 16,
});

export const dateContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 4,
});
