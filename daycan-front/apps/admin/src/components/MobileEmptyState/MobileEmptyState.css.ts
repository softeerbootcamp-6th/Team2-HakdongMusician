import { style } from "@vanilla-extract/css";

export const emptyStateContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "60px 20px",
  textAlign: "center",
  gap: 16,
  minHeight: "400px",
});

export const emptyStateIcon = style({
  fontSize: "48px",
  marginBottom: "8px",
  opacity: 0.7,
});
