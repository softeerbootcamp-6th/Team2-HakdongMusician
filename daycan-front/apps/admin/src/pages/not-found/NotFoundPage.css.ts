// src/pages/NotFoundPage.css.ts
import { keyframes, style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

const float = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-4px)" },
});

export const container = style({
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  background: COLORS.gray[50],
});

export const card = style({
  width: "100%",
  padding: "40px 32px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const illust = style({
  width: 112,
  height: 112,
  margin: "0 auto 16px",
  animation: `${float} 4s ease-in-out infinite`,
});

export const actions = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: 12,
  marginTop: 24,
  width: "100%",
});
