import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const statisticsContainer = style({
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  justifyContent: "start",
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
  alignItems: "start",
  gap: 5,
});

export const normalRangeBox = style({
  width: "12px",
  height: "12px",
  backgroundColor: COLORS.yellow[200],
  border: `1px solid ${COLORS.yellow[500]}`,
  borderRadius: "2px",
});

export const legendContainer = style({
  display: "flex",
  flexDirection: "row",
  gap: 12,
  padding: "8px",
  fontSize: "12px",
});

export const legendItem = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const legendColorBox = style({
  width: "12px",
  height: "12px",
  borderRadius: "2px",
});

export const legendText = style({
  color: COLORS.gray[700],
});

export const normalRangeLegendItem = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const normalRangeLegendText = style({
  color: COLORS.gray[600],
});

export const emptyStateContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: COLORS.gray[50],
  borderRadius: "8px",
  border: `1px solid ${COLORS.gray[200]}`,
});
