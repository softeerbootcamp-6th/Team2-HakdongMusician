import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const container = style({
  width: "100%",
  maxWidth: "358px",
  height: "100%",
  boxSizing: "border-box",
  padding: "8px",
});

export const summarySection = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
});

export const healthSummary = style({
  width: "100%",
  maxWidth: "360px",
  boxSizing: "border-box",
  backgroundColor: COLORS.white,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0px 5px 0px 24px",
  borderRadius: "16px",
});

export const healthIndex = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const indexValue = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const indexValueTitle = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "4px",
});

export const gaugeInfo = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  gap: "4px",
  cursor: "pointer",
  padding: "0px 24px",
});
export const semiCircularGaugeContainer = style({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
