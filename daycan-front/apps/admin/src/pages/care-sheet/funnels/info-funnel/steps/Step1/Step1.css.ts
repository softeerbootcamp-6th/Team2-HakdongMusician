import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const step1Container = style({
  display: "flex",
  flexDirection: "column",
  gap: "21px",
});

export const step1HighlightingHeadingContainer = style({
  display: "flex",
  flexDirection: "row",
});

export const step1TodayContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: COLORS.white,
});

export const step1DateContainer = style({
  display: "flex",
  alignSelf: "flex-end",
  flexDirection: "row",
  alignItems: "center",
  padding: "8px",
  gap: "4px",
  borderRadius: "8px",
  backgroundColor: COLORS.white,
});
