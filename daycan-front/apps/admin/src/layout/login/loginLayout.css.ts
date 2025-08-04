import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const container = style({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
  backgroundColor: COLORS.gray[50],
  alignItems: "center",
  justifyContent: "center",
});

export const section = style({
  display: "flex",
  marginTop: "auto",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: COLORS.white,
  borderRadius: "20px",
  width: "718px",
  height: "726px",
});
