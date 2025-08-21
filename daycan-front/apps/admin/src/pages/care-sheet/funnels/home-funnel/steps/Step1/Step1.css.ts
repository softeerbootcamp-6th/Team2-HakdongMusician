import { style } from "@vanilla-extract/css";

export const todayWritedCareSheetContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "100%",
  padding: "16px",
  boxSizing: "border-box",
  borderRadius: "8px",
});

export const todayWritedCareSheetTitle = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

export const todayWritedCareSheetContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
});
