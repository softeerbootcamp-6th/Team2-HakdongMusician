import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 24,
  padding: 32,
  textAlign: "center",
});

export const successIcon = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: 16,
});

export const title = style({
  color: COLORS.green[500],
});

export const buttonGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: "100%",
});
