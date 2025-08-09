import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const signatureCard = style({
  width: "100%",
  backgroundColor: COLORS.gray[50],
  borderRadius: 16,
  padding: 16,
});

export const signatureCanvasWrapper = style({
  position: "relative",
  width: "100%",
  height: 320,
  backgroundColor: COLORS.white,
  borderRadius: 12,
  border: `1px solid ${COLORS.gray[100]}`,
  overflow: "hidden",
});

export const signatureCanvas = style({
  width: "100%",
  height: "100%",
  touchAction: "none",
  WebkitUserSelect: "none",
  userSelect: "none",
});

export const signatureHint = style({
  position: "absolute",
  top: 16,
  left: 16,
  color: COLORS.gray[300],
});

export const clearButton = style({
  position: "absolute",
  backgroundColor: COLORS.transparent,
  border: "none",
  bottom: 16,
  right: 16,
});
