import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const reviewModalContainer = style({
  width: "780px",
  height: "600px",
});

export const reviewModalHeader = style({
  display: "flex",
  width: "100%",
  height: "64px",
  backgroundColor: COLORS.gray[700],
  borderRadius: "8px 8px 0 0",
  padding: "16px 24px",
  justifyContent: "space-between",
  alignItems: "center",
});

export const reviewModalHeaderLeft = style({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

export const reviewModalHeaderRight = style({
  backgroundColor: "transparent",
});

export const reviewModalContentContainer = style({
  display: "flex",
  width: "100%",
  height: "540px",
  flexDirection: "row",
  gap: "24px",
  padding: "24px",
});

export const reviewModalContentLeft = style({
  display: "flex",
  width: "350px",
  height: "100%",
  overflowY: "scroll",
  overflowX: "hidden",
  padding: "24px 16px",
  borderRadius: "12px",
  boxSizing: "border-box",
  flexDirection: "column",
  backgroundColor: COLORS.gray[50],
});

export const reviewModalContentRight = style({
  display: "flex",
  width: "450px",
  height: "100%",
  overflowY: "scroll",
  overflowX: "hidden",
  backgroundColor: COLORS.gray[50],
  borderRadius: "12px",
  padding: "24px 16px",
  boxSizing: "border-box",
});
