import { style, keyframes } from "@vanilla-extract/css";

// 편지 이미지만 뿜뿜 애니메이션
const envelopePop = keyframes({
  "0%": {
    transform: "scale(1)",
  },
  "50%": {
    transform: "scale(1.15)",
  },
  "100%": {
    transform: "scale(1)",
  },
});

export const greeting = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  height: "300px",
  width: "100%",
  boxSizing: "border-box",
  cursor: "pointer",
  position: "relative",
});

export const greetingWithAnimation = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  height: "300px",
  width: "100%",
  boxSizing: "border-box",
  cursor: "pointer",
  position: "relative",
});

// 편지 이미지 애니메이션
export const envelopeImageStyle = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "100%",
  width: "100%",
  backgroundSize: "contain",
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  transition: "transform 0.2s ease",
});

export const envelopeImageWithAnimation = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "100%",
  width: "100%",
  backgroundSize: "contain",
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  animation: `${envelopePop} 2s ease-in-out infinite`,
  transition: "transform 0.2s ease",
});

export const greetingText = style({
  display: "flex",
  flexDirection: "row",
  gap: "4px",
  zIndex: 1,
});
