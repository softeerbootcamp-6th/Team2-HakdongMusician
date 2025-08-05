import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const indexRow = style({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  gap: 20,
});

export const indexRowIconTitleContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
});

export const indexRowDescriptionContainer = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "start",
  alignSelf: "center",
  gap: 4,
});

export const indexRowDescription = style({
  flex: 1,
  padding: "10px 16px",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  borderRadius: 8,
  backgroundColor: COLORS.gray[50],
});
export const indexRowDescriptionWarning = style({
  flex: 1,
  padding: "10px 16px",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  borderRadius: 8,
  backgroundColor: COLORS.yellow[200],
});
