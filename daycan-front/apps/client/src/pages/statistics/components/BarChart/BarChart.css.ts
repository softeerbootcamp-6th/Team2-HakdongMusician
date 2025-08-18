import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const statisticsContainer = style({
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  boxSizing: "border-box",
  gap: 8,
  padding: 12,
  borderRadius: 12,
  backgroundColor: COLORS.white,
});

export const statisticsHeader = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "start",
  gap: 5,
});

export const emptyStateContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: COLORS.gray[50],
  borderRadius: "8px",
  border: `1px solid ${COLORS.gray[200]}`,
});
