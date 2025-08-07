import { style } from "@vanilla-extract/css";

export const highlightingHeading = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  position: "relative",
});

export const highlighter = style({
  position: "absolute",
  left: 0,
  bottom: 0,
  width: "100%",
  height: "30%",
  transform: "translateY(-20%)",
  zIndex: 1,
  backgroundColor: `rgba(255, 215, 0, 0.7)`,
});
