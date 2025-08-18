import { style, keyframes } from "@vanilla-extract/css";

// Keyframes
const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

const bounce = keyframes({
  "0%, 80%, 100%": {
    transform: "scale(0)",
    opacity: 0.5,
  },
  "40%": {
    transform: "scale(1)",
    opacity: 1,
  },
});

const pulse = keyframes({
  "0%": {
    transform: "scale(0.8)",
    opacity: 0.5,
  },
  "50%": {
    transform: "scale(1.2)",
    opacity: 1,
  },
  "100%": {
    transform: "scale(0.8)",
    opacity: 0.5,
  },
});

// Base styles
export const loadingContainer = style({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  padding: "16px",
});

export const loadingContainerFullscreen = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(4px)",
  zIndex: 9999,
});

// Spinner
export const loadingSpinner = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const spinnerRing = style({
  width: "100%",
  height: "100%",
  border: "3px solid transparent",
  borderRadius: "50%",
  animation: `${spin} 1s linear infinite`,
});

// Dots
export const loadingDots = style({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  justifyContent: "center",
});

export const dot = style({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  animation: `${bounce} 1.4s ease-in-out infinite both`,
});

export const dot1 = style({
  animationDelay: "0s",
});

export const dot2 = style({
  animationDelay: "0.2s",
});

export const dot3 = style({
  animationDelay: "0.4s",
});

// Pulse
export const loadingPulse = style({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  animation: `${pulse} 1.5s ease-in-out infinite`,
});

// Text
export const loadingText = style({
  fontSize: "14px",
  fontWeight: 500,
  color: "#666",
  textAlign: "center",
  lineHeight: 1.4,
});

// Mobile optimizations
export const mobileOptimized = style({
  "@media": {
    "(max-width: 768px)": {
      gap: "16px",
      padding: "20px",
    },
  },
});

export const mobileText = style({
  "@media": {
    "(max-width: 768px)": {
      fontSize: "16px",
    },
  },
});

export const mobileDot = style({
  "@media": {
    "(max-width: 768px)": {
      width: "10px",
      height: "10px",
    },
  },
});

// Dark mode support
export const darkModeFullscreen = style({
  "@media": {
    "(prefers-color-scheme: dark)": {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
  },
});

export const darkModeText = style({
  "@media": {
    "(prefers-color-scheme: dark)": {
      color: "#ccc",
    },
  },
});
