import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const infoModalContent = style({
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  maxWidth: "400px",
});

export const pointCalculateContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "22px",
  padding: "12px 26px",
  boxSizing: "border-box",
  backgroundColor: COLORS.gray[50],
  borderRadius: "10px",
});

export const pointCalculateItem = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  width: "54px",
  height: "59px",
  borderRadius: "8px",
  backgroundColor: "transparent",
});
