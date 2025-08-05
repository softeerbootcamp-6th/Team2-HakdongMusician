import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const stackContainer = style({
  position: "relative",
  perspective: "600px",
});

export const rotateCard = style({
  position: "absolute",
  cursor: "grab",
  width: "100%",
  height: "100%",
});

export const card = style({
  width: "100%",
  height: "100%",
  borderRadius: 20,
  border: `2px solid ${COLORS.white}`,
  backgroundColor: COLORS.white,
  overflow: "hidden",
  boxShadow: "2px 2px 10px 0px rgba(0, 0, 0, 0.22)",
});

export const completeButton = style({
  position: "absolute",
  bottom: "-80px",
  left: "50%",
  transform: "translateX(-50%)",

  zIndex: 10,
});

export const progressContainer = style({
  position: "absolute",
  bottom: "-40px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "8px",
  zIndex: 10,
});

export const progressDot = style({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  transition: "all 0.3s ease",
});

export const progressDotActive = style({
  backgroundColor: COLORS.yellow[500],
  transform: "scale(1.2)",
});

export const progressDotInactive = style({
  backgroundColor: COLORS.gray[300],
});
