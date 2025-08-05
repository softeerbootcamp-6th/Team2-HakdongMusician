import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const indexColumn = style({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "start",
  gap: 20,
});

export const indexColumnIconTitleContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
});

export const indexColumnDescriptionContainer = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "start",
  gap: 8,
});

export const indexColumnDescription = style({
  flex: 1,
  padding: "10px 16px",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  borderRadius: 8,
  backgroundColor: COLORS.gray[50],
});

export const indexColumnDescriptionWarning = style({
  flex: 1,
  padding: "10px 16px",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  borderRadius: 8,
  backgroundColor: COLORS.yellow[200],
});
