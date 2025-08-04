import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  backgroundColor: COLORS.white,
  padding: "16px 20px",
  boxSizing: "border-box",
});

export const healthIndexHeader = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "start",
  gap: 8,
});

export const indexChartDescription = style({
  marginTop: 12,
  textAlign: "center",
});

export const indexChartDescriptionContainer = style({
  display: "flex",
  maxWidth: 300,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
});

export const indexCardContainer = style({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: COLORS.white,
  borderRadius: 9,
  boxSizing: "border-box",
  marginTop: 15,
  gap: 2,
});

export const indexCard = style({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${COLORS.gray[100]}`,
  padding: "8px 10px",
  borderRadius: 9,
  gap: 5,
});

export const indexValue = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
});

export const indexDescription = style({
  marginTop: 18,
});
