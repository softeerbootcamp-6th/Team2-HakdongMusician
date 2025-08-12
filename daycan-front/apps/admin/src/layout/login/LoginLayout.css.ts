import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const container = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
  backgroundColor: COLORS.gray[50],
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: COLORS.gray[50],
  borderRadius: "20px",
  width: "718px",
  minHeight: "726px",
  marginBottom: "20px",
  flexShrink: 0,
});
