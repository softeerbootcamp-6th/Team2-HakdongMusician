import { style } from "@vanilla-extract/css";

export const rowCounterContainer = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

export const rowCounterLabelContainer = style({
  flex: 1,
});

export const rowCounterValueContainer = style({
  flex: 1,
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "10px",
});
