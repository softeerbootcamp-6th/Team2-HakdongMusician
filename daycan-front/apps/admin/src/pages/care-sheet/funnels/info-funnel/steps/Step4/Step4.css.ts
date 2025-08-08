import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const step4HighlightingHeadingContainer = style({
  display: "flex",
  flexDirection: "row",
});

export const step4InputContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  boxSizing: "border-box",
  padding: 16,
  backgroundColor: COLORS.white,
  height: 56,
  borderRadius: 8,
});

export const step4Input = style({
  flex: 1,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  fontSize: 17,
  fontWeight: 500,
  color: COLORS.gray[800],
});
