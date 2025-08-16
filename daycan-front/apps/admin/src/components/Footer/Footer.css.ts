import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const footer = style({
  marginTop: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  width: "100%",
});

export const footerContent = style({
  display: "flex",
  width: "775px",
  flexDirection: "column",
  gap: "12px",

  "@media": {
    "screen and (max-width: 768px)": {
      width: "90%",
      minWidth: "320px",
    },
  },
});

export const footerLogo = style({
  fontWeight: "bold",
  color: COLORS.gray[900],
});

export const footerLinks = style({
  display: "flex",
  gap: "6px",
  alignItems: "center",
  color: COLORS.gray[600],
});

export const footerLink = style({
  color: COLORS.gray[600],
  textDecoration: "none",

  ":hover": {
    textDecoration: "underline",
  },
});

export const footerDivider = style({
  width: "1px",
  height: "6px",
  backgroundColor: COLORS.gray[300],

  "@media": {
    "screen and (max-width: 768px)": {
      display: "none",
    },
  },
});

export const footerLogoLinks = style({
  display: "flex",
  alignItems: "center",
  gap: "24px",
  marginBottom: "12px",
});

export const footerInfo = style({
  display: "flex",
  flexDirection: "row",
  gap: "44px",

  "@media": {
    "screen and (max-width: 768px)": {
      flexDirection: "column",
      gap: "16px",
      alignItems: "flex-start",
    },
  },
});
