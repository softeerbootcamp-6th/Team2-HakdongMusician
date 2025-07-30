// layout.css.ts
import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  width: "100vw",
  minHeight: "100vh",
});

export const sidebar = style({
  width: "100%",
  maxWidth: "256px",
  padding: "0 24px",
  boxSizing: "border-box",
  backgroundColor: COLORS.gray[900],
  margin: "0 auto",
});

export const reportSectionWrapper = style({
  flex: 1,
  display: "flex",
  justifyContent: "center", // 가운데 정렬 위해
  backgroundColor: COLORS.gray[800],
});

export const reportSection = style({
  width: "100%",
  backgroundColor: COLORS.gray[700],
  padding: "0 84px",
  margin: "0 auto",
  boxSizing: "border-box",
});
