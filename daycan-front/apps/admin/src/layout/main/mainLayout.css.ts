// layout.css.ts
import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "row",
  width: "100vw",
  minHeight: "100vh",
});

export const sidebarWrapper = style({
  flex: 1,
  backgroundColor: COLORS.gray[900],
});

export const sidebar = style({
  width: "100%",
  height: "100%",
  margin: "0 auto",

  boxSizing: "border-box",

  maxWidth: "256px",
  backgroundColor: COLORS.gray[300],
});

export const mainSectionWrapper = style({
  flex: 4,
  display: "flex",
  justifyContent: "center", // 가운데 정렬 위해
  backgroundColor: COLORS.gray[800],
});

export const mainSection = style({
  width: "100%",
  backgroundColor: COLORS.gray[700],
  maxWidth: "1256px",
  padding: "0 84px",
  margin: "0 auto 0 0 ",
  boxSizing: "border-box",
});
