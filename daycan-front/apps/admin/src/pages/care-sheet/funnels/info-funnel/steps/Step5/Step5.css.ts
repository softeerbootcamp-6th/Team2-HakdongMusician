import { style } from "@vanilla-extract/css";

export const step5InfoContainer = style({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  gap: "10px",
  marginTop: "12px",
});

export const step5InfoRow = style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  padding: "8px",
  boxSizing: "border-box",
  alignItems: "center",
});
