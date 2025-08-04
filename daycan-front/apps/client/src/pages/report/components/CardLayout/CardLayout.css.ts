import { style } from "@vanilla-extract/css";

export const cardLayout = style({
  width: "100%",
  height: "100%",
  padding: "24px 20px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "column",
  gap: 12,
});

export const cardLayoutHeader = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "start",
  justifyContent: "start",
  alignSelf: "start",
  gap: 8,
});

export const cardLayoutFooter = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "start",
  gap: 13,
  width: "100%",
});

export const cardLayoutFooterStampDescription = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  gap: 4,
});
