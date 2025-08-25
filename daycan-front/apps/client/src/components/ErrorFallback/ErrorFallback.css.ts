import { keyframes, style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

const float = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-4px)" },
});

export const errorFallbackContainer = style({
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  background: COLORS.gray[50],

  "@media": {
    "screen and (max-width: 768px)": {
      display: "inline-block",
      paddingTop: 80,
    },
  },
});

export const errorFallbackCard = style({
  width: "100%",
  padding: "40px 32px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const errorIllust = style({
  animation: `${float} 4s ease-in-out infinite`,
});

export const errorActions = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: 12,
  marginTop: 24,
  width: "100%",
  flexWrap: "wrap",
});

export const pcDescriptionWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 18,

  "@media": {
    "screen and (max-width: 767px)": {
      display: "none",
    },
  },
});

export const mobileDescriptionWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,

  "@media": {
    "screen and (min-width: 768px)": {
      display: "none",
    },
  },
});

export const alertErrorIcon = style({
  "@media": {
    "screen and (max-width: 768px)": {
      width: 120,
      height: 120,
    },
  },
});
